import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";
const router = express.Router();

const constructSearchQuery = (queryParams: any) => {
  let constructQuery: any = {};
  if (queryParams.destination) {
    constructQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }
  if (queryParams.adultCount) {
    constructQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }
  if (queryParams.childCount) {
    constructQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : queryParams.stars;
    constructQuery.starRating = {
      $eq: starRatings,
    };
  }
  if (queryParams.maxPrice) {
    constructQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }
  return constructQuery;
};

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRatings":
        sortOptions = { starRatings: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;

      default:
        break;
    }
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Hotel.countDocuments(query);
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default router;