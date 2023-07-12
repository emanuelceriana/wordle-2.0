import { useCallback, useEffect, useRef, useState } from "react";
import "./Grid.css";
import { Keyboard } from "./Keyboard";
import Modal from "./Modal";
import { Row } from "./Row";
import useClickOutside from "./hooks/useClickOutside";
import { useCreateObjectList } from "./hooks/useCreateObjectList";
import { useGetRandomWord } from "./hooks/useGetRandomWord";
import { ValidationArray } from "./utils";
import WinSound from "../assets/winSound.wav";
import LoseSound from "../assets/loseSound.wav";

interface GridProps {
  wordLength: number;
  tryCount: number;
  restartGame: () => void;
}

export interface GlobalWordArray {
  [key: string]: number;
}

export const Grid = ({ wordLength, tryCount, restartGame }: GridProps) => {
  const [activeRowIdx, setActiveRowIdx] = useState(0);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isEndGame, setIsGameEnd] = useState<boolean>(false);
  const [globalWordArrayValidation, setGlobalWordArrayValidation] =
    useState<GlobalWordArray>({});
  const { objectList: gridRows } = useCreateObjectList({ length: tryCount });

  const { randomWord = "" } = useGetRandomWord({ wordLength });

  const rowRefs = useRef<HTMLDivElement[]>([]);

  const winSound = new Audio(WinSound);
  const loseSound = new Audio(LoseSound);

  useClickOutside({ rowRefs, activeRowIdx });

  useEffect(() => {
    if (isEndGame) isWinner ? winSound.play() : loseSound.play();
  }, [isEndGame, isWinner]);

  useEffect(() => {
    if (activeRowIdx === tryCount) setIsGameEnd(true);
  }, [activeRowIdx, tryCount]);

  const handleGlobalWordArray = useCallback(
    (arrayValidation: ValidationArray[]) => {
      const globalWordValidation: GlobalWordArray = {
        ...globalWordArrayValidation,
      };

      arrayValidation.map(({ value, letter }) => {
        globalWordValidation[letter] = value;
      });

      setGlobalWordArrayValidation(globalWordValidation);
    },
    [globalWordArrayValidation]
  );

  return (
    <>
      <div className="grid">
        {tryCount &&
          gridRows.map(({ id }, idx) => (
            <Row
              key={id}
              idx={idx}
              activeRowIdx={activeRowIdx}
              setActiveRowIdx={setActiveRowIdx}
              wordLength={wordLength}
              randomWord={randomWord}
              setIsWinner={setIsWinner}
              setIsEndGame={setIsGameEnd}
              setGlobalWordArrayValidation={handleGlobalWordArray}
              ref={(ref: HTMLDivElement) => (rowRefs.current[idx] = ref)}
            />
          ))}
      </div>
      <Keyboard
        globalWordArrayValidation={globalWordArrayValidation}
        activeRow={rowRefs.current[activeRowIdx]}
      />
      <Modal isOpen={isEndGame} showCloseButton={false}>
        {isWinner ? (
          <>
            <h3>You Win! 🥳 </h3>
            <p>{`You did it in just ${activeRowIdx} tries`}</p>
          </>
        ) : (
          <>
            <h3>You Lose! 😰</h3>
            <p>
              The word was: <strong>{randomWord.toUpperCase()}</strong>
            </p>
          </>
        )}
        <div>
          <button onClick={restartGame}>
            {isWinner ? "Play Again?" : "Another Try?"}
          </button>
        </div>
      </Modal>
    </>
  );
};
