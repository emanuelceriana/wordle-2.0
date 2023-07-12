import { forwardRef, useEffect, useMemo, useState } from "react";
import { LetterBlock } from "./LetterBlock";
import "./Row.css";
import { useCreateObjectList } from "./hooks/useCreateObjectList";
import useKeyDown from "./hooks/useKeyDown";
import { ValidationArray, isCorrectWord } from "./utils";

interface RowProps {
  idx: number;
  activeRowIdx: number;
  wordLength: number;
  randomWord: string;
  setActiveRowIdx: (idx: number) => void;
  setIsWinner: (value: boolean) => void;
  setIsEndGame: (value: boolean) => void;
  setGlobalWordArrayValidation: (value: ValidationArray[]) => void;
}

const defaultFocusedInputIdx = 0;

export interface RowRef {
  element: HTMLDivElement | null;
  handleKeyDown: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      idx,
      activeRowIdx,
      wordLength,
      randomWord,
      setActiveRowIdx,
      setIsWinner,
      setIsEndGame,
      setGlobalWordArrayValidation,
    },
    rowRef
  ) => {
    const [focusedInputIdx, setFocusedInputIdx] = useState(
      defaultFocusedInputIdx
    );
    const [inputValues, setInputValues] = useState<string[]>([]);
    const isRowActive = useMemo(() => idx === activeRowIdx, [activeRowIdx]);

    const { objectList: rowInputs } = useCreateObjectList({
      length: wordLength,
    });

    const { handleKeyDown, wordArrayValidation } = useKeyDown({
      isRowActive,
      setFocusedInputIdx,
      setActiveRowIdx,
      activeRowIdx,
      inputValues,
      setInputValues,
      focusedInputIdx,
      wordLength,
      randomWord,
    });

    useEffect(() => {
      setGlobalWordArrayValidation(wordArrayValidation);
      if (isCorrectWord(wordArrayValidation)) {
        setIsWinner(true);
        setIsEndGame(true);
      }
    }, [wordArrayValidation]);

    return (
      <div ref={rowRef} className="row" tabIndex={-1} onKeyDown={handleKeyDown}>
        {wordLength &&
          rowInputs.map(({ id }, idx) => (
            <LetterBlock
              key={id}
              idx={idx}
              isFocused={focusedInputIdx === idx && isRowActive}
              value={inputValues[idx]}
              focusable={isRowActive}
              setFocusedInputIdx={setFocusedInputIdx}
              inputValidation={wordArrayValidation[idx]}
            />
          ))}
      </div>
    );
  }
);
