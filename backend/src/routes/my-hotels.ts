import express, { Request, Response } from "express";
import multer from "multer";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import fs from "fs";
import path from "path";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
// import cloudinary from "cloudinary";
/**
 *
 * For cloudinary setup
 *
 */
const uploadImages = (imageFiles: Express.Multer.File[]) => {
  const imageUrls = imageFiles.map((image) => {
    const targetPath = new URL(
      "http://localhost:7000/images/" + image.filename
    );
    return targetPath.href;
  });
  return imageUrls;
};

// const uploadImages = async (imageFiles: Express.Multer.File[]) => { --for CLOUDINARY
//   const uploadPromises = imageFiles.map(async (image) => {
//     const b64 = Buffer.from(image.buffer).toString("base64");
//     let dataURI = "data:" + image.mimetype + ";base64," + b64;
//     const res = await cloudinary.v2.uploader.upload(dataURI);
//     return res.url;
//   });
//   const imageUrls = await Promise.all(uploadPromises);
//   return imageUrls;
// };
const router = express.Router();

const localStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: localStorage, //storage:storage    -for cloudinary
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log(file, "File", file.mimetype);

      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight").notEmpty().withMessage("Price Per Night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is required"),
  ],
  upload.array("imageFiles", 6),
  async function (req: Request, res: Response) {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const imageUrls = uploadImages(imageFiles);
      const newHotel: HotelType = req.body;
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel);
    } catch (error) {
      console.log("Error creating hotel:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId, userId: req.userId },
        updatedHotel,
        { new: true }
      );
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      const files = req.files as Express.Multer.File[];
      const uploadImageUrls = uploadImages(files);
      hotel.imageUrls = [...uploadImageUrls, ...(updatedHotel.imageUrls || [])];
      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
export default router;
