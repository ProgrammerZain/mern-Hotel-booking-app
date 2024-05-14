import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
// import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";

// cloudinary.config({
//   cloud_name: process.env.C,
// });

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log(
      "Connected to database: ",
      process.env.MONGODB_CONNECTION_STRING
    );
  })
  .catch((e) => {
    console.log("Error in mongodb connection");
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});
let PORT = 7000;
app.listen(PORT, () => {
  console.log("server running on localhost:" + PORT);
});
