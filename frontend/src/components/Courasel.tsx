import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { HotelType } from "../../../backend/src/shared/types";
import LatestDestinationCard from "./LatestDestinationCard";
import { useEffect, useState } from "react";

type Props = {
  items: HotelType[];
};
function Carousal({ items }: Props) {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [styles, setStyles] = useState<string>("translateX(-100%)");

  function prevSlide() {
    setSlideIndex((slideIndex) =>
      slideIndex == 0 ? items.length - 1 : slideIndex - 1
    );
  }

  function nextSlide() {
    setSlideIndex((slideIndex) =>
      slideIndex === items.length - 1 ? 0 : slideIndex + 1
    );
  }
  useEffect(() => {
    setStyles(`translateX(-${slideIndex * 100}%)`);
  }, [slideIndex]);
  if (items && items.length === 0) {
    return <></>;
  }
  return (
    <div className="relative flex  overflow-hidden ">
      {items.map((hotel, index) => (
        <div
          key={index}
          className={`w-full flex-shrink-0 transition duration-500`}
          style={{ transform: styles }}
        >
          <span className=" absolute top-5 right-5 text-white z-20 bg-blue-500 p-2 rounded-lg">
            {" "}
            {hotel.adultCount + hotel.childCount} people are currently present.
          </span>
          <LatestDestinationCard hotel={hotel} key={index} />
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute p-2 bg-blue-500 rounded-full hover:bg-blue-600 top-1/2 left-5"
      >
        <BiArrowToLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute p-2 bg-blue-500 rounded-full hover:bg-blue-600 top-1/2 right-5"
      >
        <BiArrowToRight />
      </button>
      <div className="absolute bottom-4 right-0 left-0">
        <div className=" flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-white rounded-full ${
                slideIndex === i ? "p-2" : " bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousal;
