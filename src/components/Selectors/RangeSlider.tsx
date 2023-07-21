import { ChangeEvent, useState } from "react";
import styles from "./RangeSlider.module.scss";
import { defaultMinTriesAmount, defaultMaxTriesAmount } from "./constants";

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
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 50) {
      setTriesCount(parseInt(e.target.value));
      onChangeRequest(parseInt(e.target.value));
    }
  };

  return (
    <div className={styles.rangeSlider}>
      <span className={styles["rangeSlider__label"]}>Try Count:</span>
      <div className={styles["rangeSlider__input"]}>
        <span>{defaultMinTriesAmount}</span>
        <input
          type="range"
          onChange={handleChangeRangeSlider}
          min={defaultMinTriesAmount}
          max={defaultMaxTriesAmount}
          step={1}
          value={triesCount}
        ></input>
        <span>{defaultMaxTriesAmount}</span>
        <div className={styles["rangeSlider__counter"]}>{triesCount}</div>
      </div>
    </div>
  );
};
