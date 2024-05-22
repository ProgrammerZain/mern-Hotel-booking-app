import { useState } from "react";
import AnimateComponent from "./AnimateComponent";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function StartRatingFilter({ selectedStars, onChange }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleIsOpen = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 onClick={handleIsOpen} className="text-md font-semibold mb-2">
        Property Rating
      </h4>
      <AnimateComponent open={isOpen} from="h-0 opacity-0 hidden " to="h-auto">
        {["5", "4", "3", "2", "1"].map((star) => {
          return (
            <label key={star} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                value={star}
                checked={selectedStars.includes(star)}
                onChange={onChange}
              />
              <span>{star} Stars</span>
            </label>
          );
        })}
      </AnimateComponent>
    </div>
  );
}

export default StartRatingFilter;
