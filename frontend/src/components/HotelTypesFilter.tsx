import { hotelTypes } from "../config/hotel-options-config";
import { useState } from "react";
import AnimateComponent from "./AnimateComponent";
type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function HotelTypesFilter({ selectedHotelTypes, onChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleIsOpen = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  return (
    <div className="border-b border-slate-300 pb-5 overflow-y-hidden">
      <h4 onClick={handleIsOpen} className="text-md font-semibold mb-2">
        Hotel Type
      </h4>
      <AnimateComponent open={isOpen} from="h-0 opacity-0 hidden" to="h-auto">
        {hotelTypes.map((hotelType) => {
          return (
            <label key={hotelType} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={hotelType}
                checked={selectedHotelTypes.includes(hotelType)}
                onChange={onChange}
              />
              <span>{hotelType} </span>
            </label>
          );
        })}
      </AnimateComponent>
    </div>
  );
}

export default HotelTypesFilter;
