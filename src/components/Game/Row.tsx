import { forwardRef, useContext, useMemo, useState, useEffect } from "react";
import { AppContext, IAppContext } from "../../context/AppContext";
import { LetterBlock } from "./LetterBlock";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import useKeyDown from "../hooks/useKeyDown";
import styles from "./Row.module.scss";
import { isCorrectWord } from "../../utils";

interface RowProps {
  idx: number;
}

const defaultFocusedInputIdx = 0;

export interface RowRef {
  element: HTMLDivElement | null;
  handleKeyDown: (e: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => void;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(({ idx }, rowRef) => {
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
  const [inputValues, setInputValues] = useState<string[]>([]);
  const isRowActive = useMemo(() => idx === activeRowIdx, [activeRowIdx]);

  const { objectList: rowInputs } = useCreateObjectList({
    length: wordLength,
  });

  const { handleKeyDown, wordInputValidation } = useKeyDown({
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
            inputValidation={wordInputValidation[idx]}
          />
        ))}
    </div>
  );
});
