import { hotelFacilities } from "../config/hotel-options-config";

import { useState } from "react";
import AnimateComponent from "./AnimateComponent";
type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FacilitiesFilter({ selectedFacilities, onChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleIsOpen = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 onClick={handleIsOpen} className="text-md font-semibold mb-2">
        Facilities
      </h4>
      <AnimateComponent open={isOpen} from="h-0 opacity-0 hidden" to="h-auto">
        {hotelFacilities.map((facility) => {
          return (
            <label key={facility} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={onChange}
              />
              <span>{facility} </span>
            </label>
          );
        })}
      </AnimateComponent>
    </div>
  );
}

export default FacilitiesFilter;
