import { forwardRef, useContext, useMemo, useState, useEffect } from "react";
import { AppContext, IAppContext } from "../../context/AppContext";
import { LetterBlock } from "./LetterBlock";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import { useKeyUp } from "../hooks/useKeyUp";
import styles from "./Row.module.scss";
import { isCorrectWord } from "../../utils";

interface RowProps {
  idx: number;
  rowWord: string[];
  setRowsWord: (x: string[]) => void;
}

const defaultFocusedInputIdx = 0;

export const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ idx, rowWord, setRowsWord }, rowRef) => {
    const {
      setActiveRowIdx,
      randomWord,
      wordLength,
      activeRowIdx,
      setIsWinner,
      setIsEndGame,
    } = useContext<IAppContext>(AppContext);

    const [focusedInputIdx, setFocusedInputIdx] = useState(
      defaultFocusedInputIdx
    );

    const isRowActive = useMemo(() => idx === activeRowIdx, [activeRowIdx]);

    const { objectList: rowInputs } = useCreateObjectList({
      length: wordLength,
    });

    const { handleKeyUp, wordInputValidation } = useKeyUp({
      isRowActive,
      setFocusedInputIdx,
      setActiveRowIdx,
      activeRowIdx,
      rowWord,
      setRowsWord,
      focusedInputIdx,
      wordLength,
      randomWord,
    });

    useEffect(() => {
      if (isCorrectWord(wordInputValidation)) {
        setIsWinner(true);
        setIsEndGame(true);
      }
    }, [wordInputValidation]);

    return (
      <div
        ref={rowRef}
        className={styles.row}
        tabIndex={-1}
        onKeyUp={handleKeyUp}
      >
        {wordLength &&
          rowInputs.map(({ id }, idx) => (
            <LetterBlock
              key={id}
              idx={idx}
              isFocused={focusedInputIdx === idx && isRowActive}
              value={rowWord?.[idx]}
              focusable={isRowActive}
              setFocusedInputIdx={setFocusedInputIdx}
              inputValidation={wordInputValidation[idx]}
            />
          ))}
      </div>
    );
  }
);
