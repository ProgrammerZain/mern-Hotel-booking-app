import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import AnimateComponent from "./AnimateComponent";
type Props = {
  hotel: HotelType | undefined;
};
function Banner({ hotel }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValue(
      destination,
      search.checkIn,
      search.checkOut,
      search.adultCount,
      search.childCount
    );
    navigate("/search");
  };
  if (!hotel) {
    return <></>;
  }
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div
        className="flex flex-col gap-5 relative "
        onMouseEnter={() => {
          setIsOpen(false);
        }}
        onMouseLeave={() => {
          setIsOpen(true);
        }}
      >
        <h1 className="font-bold text-2xl">
          Find deals om hotels
          <br />
          resorts and much more...
        </h1>
        <p className="text-sm text-gray-400">
          We've got you covered with amazing deals at thousands upon thousands
          of top hotels in cities & countries worldwide
        </p>
        <form
          onSubmit={handleSubmit}
          className={
            " overflow-x-hidden bg-orange-400 rounded shadow-md flex flex-wrap  gap-4 z-20 transition duration-200 " +
            (isOpen ? "size-0" : "h-36 w-full p-2")
          }
        >
          <AnimateComponent open={isOpen} from="w-0 " to="w-full">
            <div className="flex flex-col items-center flex-1 bg-white p-2 mb-2">
              <span className="self-start font-bold">Location</span>
              <input
                type="text"
                placeholder="Where are you going?"
                className="text-md w-52 focus:outline-none"
                value={destination}
                onChange={(event) => setDestination(event?.target.value)}
              />
            </div>

            <div className="flex gap-1">
              <button className="w-auto bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
                Search
              </button>
            </div>
          </AnimateComponent>
        </form>
      </div>
      <div className="relative hover:scale-105 transition duration-300 group">
        <div>
          <img
            className="w-full h-full object-cover object-center"
            src={hotel.imageUrls[0]}
            alt={hotel.name}
          />
        </div>
        <span className="transition duration-500 opacity-0 group-hover:opacity-100 absolute top-5 right-5">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => {
              return (
                <span
                  className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
                  key={facility}
                >
                  {facility}
                </span>
              );
            })}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
        </span>

        <div className="p-4 left-14 -bottom-14  absolute  sm:w-72 h-auto text-black bg-white shadow w-auto">
          <h2 className="font-bold text-lg">{hotel.name}</h2>
          <span className=" text-sm text-gray-300">
            {hotel.city} , {hotel.country}
          </span>
          <div className="flex justify-between flex-wrap">
            <span>
              <span className="text-blue-500">{hotel.pricePerNight}</span>
              $/night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="w-24 bg-blue-600 text-white h-full p-1 font-bold  hover:bg-blue-500"
            >
              View Hotel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
