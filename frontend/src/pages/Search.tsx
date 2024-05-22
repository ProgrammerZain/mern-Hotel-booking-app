import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import React, { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StartRatingFilter from "../components/StartRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("");
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotelClicked) => hotelClicked !== hotelType)
    );
  };
  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacility) =>
      event.target.checked
        ? [...prevFacility, facility]
        : prevFacility.filter((prevFacility) => prevFacility !== facility)
    );
  };
  const handleIsOpen = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="hidden md:block">
        <NavBar
          selectedFacilities={selectedFacilities}
          selectedHotelTypes={selectedHotelTypes}
          selectedPrice={selectedPrice}
          selectedStars={selectedStars}
          setSelectedPrice={setSelectedPrice}
          handleFacilityChange={handleFacilityChange}
          handleHotelTypeChange={handleHotelTypeChange}
          handleStarsChange={handleStarsChange}
        />
      </div>
      <div className="md:hidden sticky top-10 ">
        <button
          onClick={handleIsOpen}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`transition-all animate-[wiggle_1s_ease-in-out] absolute ${
            isOpen ? "-left-96 " : "left-0"
          } `}
        >
          <NavBar
            selectedFacilities={selectedFacilities}
            selectedHotelTypes={selectedHotelTypes}
            selectedPrice={selectedPrice}
            selectedStars={selectedStars}
            setSelectedPrice={setSelectedPrice}
            handleFacilityChange={handleFacilityChange}
            handleHotelTypeChange={handleHotelTypeChange}
            handleStarsChange={handleStarsChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 px-2">
        <div className="flex justify-between items-center flex-wrap">
          <span className="text-xl font-bold ">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? `in ${search.destination}` : ``}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel, index) => {
          return (
            <React.Fragment key={index}>
              <SearchResultsCard hotel={hotel} />
            </React.Fragment>
          );
        })}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;

type Props = {
  selectedStars: string[];
  selectedHotelTypes: string[];
  selectedFacilities: string[];
  selectedPrice: number | undefined;
  handleStarsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleHotelTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFacilityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedPrice: (event: number | undefined) => void;
};

const NavBar = ({
  selectedStars,
  handleStarsChange,
  selectedHotelTypes,
  handleHotelTypeChange,
  selectedFacilities,
  handleFacilityChange,
  selectedPrice,
  setSelectedPrice,
}: Props) => {
  return (
    <div className="rounded-lg border border-slate-300 p-5 md:max-h-fit sticky top-10 bg-white max-h-[440px] overflow-auto">
      <div className="space-y-5 ">
        <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
          Filter By:
        </h3>
        <StartRatingFilter
          selectedStars={selectedStars}
          onChange={handleStarsChange}
        />
        <HotelTypesFilter
          selectedHotelTypes={selectedHotelTypes}
          onChange={handleHotelTypeChange}
        />
        <FacilitiesFilter
          selectedFacilities={selectedFacilities}
          onChange={handleFacilityChange}
        />
        <PriceFilter
          selectedPrice={selectedPrice}
          onChange={(value?: number) => setSelectedPrice(value)}
        />
      </div>
    </div>
  );
};
