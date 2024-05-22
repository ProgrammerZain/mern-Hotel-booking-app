import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import Banner from "../components/Banner";
import Courasel from "../components/Courasel";
function Home() {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2, 8) || [];
  const carousal = hotels?.slice(8, 14) || [];
  return (
    <div className=" px-2.5 space-y-3 flex flex-col md:gap-36 gap-16">
      <Banner hotel={hotels ? hotels[0] : undefined} />
      <div className="grid gap-4 ">
        <h2 className="text-3xl font-bold pt-48 md:pt-20 ">
          Latest Destination
        </h2>
        <p className=" text-gray-500">
          Most recent destinations added by our hosts
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel, index) => (
            <div className="relative group" key={index}>
              <LatestDestinationCard hotel={hotel} />
              <span className="bg-blue-500 absolute top-5 left-5 text-white p-2">
                NEW
              </span>
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
              <span className="transition duration-500 opacity-0 group-hover:opacity-100 absolute  top-16 right-5 text-white bg-blue-500 p-2 font-bold">
                ${hotel.pricePerNight} per night
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold pt-48 md:pt-20  mb-3">
          Most Visited Restaurants
        </h2>
        <p className=" text-gray-500  mb-3">
          Most visited destinations added by our clients
        </p>
        <div className="grid md:grid-cols-3 gap-4 ">
          {bottomRowHotels.map((hotel, index) => (
            <div
              className="relative group hover:scale-105 transition duration-300"
              key={index}
            >
              <LatestDestinationCard hotel={hotel} />
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
              <span className="transition duration-500 opacity-0 group-hover:opacity-100 absolute top-5 left-5 text-white bg-blue-500 p-2 font-bold">
                ${hotel.pricePerNight} per night
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold pt-48 md:pt-20 mb-3">
          Our Most Economical Hotels:
        </h2>
        <Courasel items={carousal} />
      </div>
    </div>
  );
}

export default Home;
