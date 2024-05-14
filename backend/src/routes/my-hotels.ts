import express, { Request, Response } from "express";
import multer from "multer";
import Hotel, { HotelType } from "../models/hotel";
import fs from "fs";
import path from "path";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
// import cloudinary from "cloudinary";
const router = express.Router();
const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, 'uploads');
//   },
//   filename: function (req: any, file: any, cb: any) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

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
// const upload = multer({
//   storage: storage,
//   fileFilter: (req: any, file: any, cb: any) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   },
// });

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
/**
 * 
 * fs.readFile(req.files.urForm-data_name.path, function (err, data) {
       fs.writeFile(newPath, data, function (err) {
      });
    });
 });
 * 
 */
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
      /**
       *
       * For cloudinary setup
       *
       */
      const imageFiles = req.files as Express.Multer.File[];
      //   const newHotel = req.body;
      const uploadPromises = imageFiles.map(async (image) => {
        //     const b64 = Buffer.from(image.buffer).toString("base64");
        //     let dataURI = "data:" + image.mimetype + ",base64," + b64;
        //     const res = await cloudinary.v2.uploader.upload(dataURI);
        //     return res.url;
        const targetPath = path.join(
          __dirname,
          "./uploads/" + image.originalname
        );
        return targetPath;
      });
      const imageUrls = await Promise.all(uploadPromises);
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
export default router;
