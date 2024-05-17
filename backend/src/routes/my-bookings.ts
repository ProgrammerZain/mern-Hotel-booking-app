import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
const router = express.Router();
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    console.log(1);

    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });
    console.log(hotels, "hotels");

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      console.log(hotel, "hotel");

      const hotelWithUserBooking: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBooking;
    });
    console.log(results, "results");

    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});
// router.get("/:id", verifyToken, async (req: Request, res: Response) => {
//   const id = req.params.id.toString();
//   try {
//     const hotel = await Hotel.findOne({
//       _id: id,
//       userId: req.userId,
//     });
//     res.json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching hotels" });
//   }
// });
// router.put(
//   "/:hotelId",
//   verifyToken,
//   upload.array("imageFiles"),
//   async (req: Request, res: Response) => {
//     try {
//       const updatedHotel: HotelType = req.body;
//       updatedHotel.lastUpdated = new Date();
//       const hotel = await Hotel.findOneAndUpdate(
//         { _id: req.params.hotelId, userId: req.userId },
//         updatedHotel,
//         { new: true }
//       );
//       if (!hotel) {
//         return res.status(404).json({ message: "Hotel not found" });
//       }
//       const files = req.files as Express.Multer.File[];
//       const uploadImageUrls = uploadImages(files);
//       hotel.imageUrls = [...uploadImageUrls, ...(updatedHotel.imageUrls || [])];
//       await hotel.save();
//       res.status(201).json(hotel);
//     } catch (error) {
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   }
// );
export default router;
