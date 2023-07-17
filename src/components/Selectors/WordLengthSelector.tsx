import cn from "classnames";
import { useState } from "react";
import wordsDS from "../../data/wordsDataSet.json";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import styles from "./WordLengthSelector.module.scss";

const maxWordsLength = 9;
const minWordsLength = 4;

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
    length: maxWordsLength,
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
          {wordLengthButtons.slice(3).map(({ id }, idx) => {
            const minIdx = idx + minWordsLength;
            return (
              <button
                key={id}
                className={cn(styles["wordLengthSelector__button"], {
                  [styles["wordLengthSelector__selected"]]:
                    optionSelected === minIdx,
                })}
                onClick={() => handleClickAction(minIdx.toString())}
              >
                {minIdx}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordLengthSelector;
