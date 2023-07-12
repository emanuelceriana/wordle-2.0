import cn from "classnames";
import { useState } from "react";
import wordsDS from "../data/wordsDataSet.json";
import "./WordLengthSelector.css";
import { useCreateObjectList } from "./hooks/useCreateObjectList";

interface WordLengthSelectorProps {
  defaultValue: string;
  onClickRequest: (key: number) => void;
}

export const WordLengthSelector = ({
  defaultValue,
  onClickRequest,
}: WordLengthSelectorProps) => {
  const [optionSelected, setOptionSelected] = useState<string>(defaultValue);

  const { objectList: wordLengthButtons } = useCreateObjectList({
    length: Object.keys(wordsDS).length,
  });

  const handleClickAction = (key: string) => {
    setOptionSelected(key);
    onClickRequest(parseInt(key));
  };

  return (
    <div>
      <div className="wordLengthSelector">
        <span>Word Length:</span>
        <div className="buttons">
          {wordLengthButtons.map(({ id }, idx) => {
            const key = Object.keys(wordsDS)[idx];
            return (
              <button
                key={id}
                className={cn("button", { selected: optionSelected === key })}
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
