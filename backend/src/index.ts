import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log(
      "Connected to database: ",
      process.env.MONGODB_CONNECTION_STRING
    );
  })
  .catch((e) => {
    console.log(e);
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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

let PORT = 7000;
app.listen(PORT, () => {
  console.log("server running on localhost:" + PORT);
});
