import { ChangeEvent, useState } from "react";
import "./RangeSlider.css";

interface RangeSliderProps {
  defaultValue: number;
  onChangeRequest: (value: number) => void;
}

export const RangeSlider = ({
  defaultValue,
  onChangeRequest,
}: RangeSliderProps) => {
  const [tryCount, setTryCount] = useState<number>(defaultValue);

  const handleChangeRangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setTryCount(parseInt(e.target.value));
    onChangeRequest(parseInt(e.target.value));
  };

  return (
    <div className="rangeSlider">
      <span className="label">Try Count:</span>
      <div className="input">
        <span>1</span>
        <input
          type="range"
          onChange={handleChangeRangeSlider}
          min={1}
          max={50}
          step={1}
          value={tryCount}
          className="custom-slider"
        ></input>
        <span>50</span>
        <div className="counter">{tryCount}</div>
      </div>
    </div>
  );
};
