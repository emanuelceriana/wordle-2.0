import cn from "classnames";
import { useState } from "react";
import wordsDS from "../../data/wordsDataSet.json";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import styles from "./WordLengthSelector.module.scss";

interface WordLengthSelectorProps {
  defaultValue: number;
  onClickRequest: (key: number) => void;
}

export const WordLengthSelector = ({
  defaultValue,
  onClickRequest,
}: WordLengthSelectorProps) => {
  const [optionSelected, setOptionSelected] = useState<number>(defaultValue);

  const { objectList: wordLengthButtons } = useCreateObjectList({
    length: Object.keys(wordsDS).length,
  });

  const handleClickAction = (key: string) => {
    setOptionSelected(parseInt(key));
    onClickRequest(parseInt(key));
  };

  return (
    <div>
      <div className={styles.wordLengthSelector}>
        <span>Word Length:</span>
        <div className={styles["wordLengthSelector__buttons"]}>
          {wordLengthButtons.map(({ id }, idx) => {
            const key = Object.keys(wordsDS)[idx];
            return (
              <button
                key={id}
                className={cn(styles["wordLengthSelector__button"], {
                  [styles["wordLengthSelector__selected"]]:
                    optionSelected.toString() === key,
                })}
                onClick={() => handleClickAction(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordLengthSelector;
