import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { AppContext, IAppContext } from "../../context/AppContext";
import { LetterBlock } from "./LetterBlock";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import useKeyDown from "../hooks/useKeyDown";
import { ValidationArray, isCorrectWord } from "../utils";
import styles from "./Row.module.scss";

interface RowProps {
  idx: number;
  setGlobalWordArrayValidation: (value: ValidationArray[]) => void;
}

const defaultFocusedInputIdx = 0;

export interface RowRef {
  element: HTMLDivElement | null;
  handleKeyDown: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ idx, setGlobalWordArrayValidation }, rowRef) => {
    const {
      setActiveRowIdx,
      setIsWinner,
      setIsEndGame,
      randomWord,
      wordLength,
      activeRowIdx,
    } = useContext<IAppContext>(AppContext);

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

    // -> llevar a otro lado
    useEffect(() => {
      setGlobalWordArrayValidation(wordArrayValidation);
      if (isCorrectWord(wordArrayValidation)) {
        setIsWinner(true);
        setIsEndGame(true);
      }
    }, [wordArrayValidation]);
    // <-

    return (
      <div
        ref={rowRef}
        className={styles.row}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
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
