import { ChangeEvent, useState } from "react";
import styles from "./RangeSlider.module.scss";

interface RangeSliderProps {
  defaultValue: number;
  onChangeRequest: (value: number) => void;
}

export const RangeSlider = ({
  defaultValue,
  onChangeRequest,
}: RangeSliderProps) => {
  const [triesCount, setTriesCount] = useState<number>(defaultValue);

  const handleChangeRangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setTriesCount(parseInt(e.target.value));
    onChangeRequest(parseInt(e.target.value));
  };

  return (
    <div className={styles.rangeSlider}>
      <span className={styles["rangeSlider__label"]}>Try Count:</span>
      <div className={styles["rangeSlider__input"]}>
        <span>1</span>
        <input
          type="range"
          onChange={handleChangeRangeSlider}
          min={1}
          max={50}
          step={1}
          value={triesCount}
        ></input>
        <span>50</span>
        <div className={styles["rangeSlider__counter"]}>{triesCount}</div>
      </div>
    </div>
  );
};
