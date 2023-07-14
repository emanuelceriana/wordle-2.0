import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import styles from "./Grid.module.scss";
import { Keyboard } from "./Keyboard";
import { Row } from "./Row";
import useClickOutside from "../hooks/useClickOutside";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import { ValidationArray } from "../utils";
import WinSound from "../../assets/winSound.wav";
import LoseSound from "../../assets/loseSound.wav";

export interface GlobalWordArray {
  [key: string]: number;
}

export const Grid = ({}) => {
  const [globalWordArrayValidation, setGlobalWordArrayValidation] =
    useState<GlobalWordArray>({});

  const { activeRowIdx, triesCount, isEndGame, isWinner } =
    useContext<IAppContext>(AppContext);

  const { objectList: gridRows } = useCreateObjectList({ length: triesCount });

  const rowRefs = useRef<HTMLDivElement[]>([]);

  useClickOutside({ rowRefs, activeRowIdx });

  //Crear componente SoundFXController
  const winSound = new Audio(WinSound);
  const loseSound = new Audio(LoseSound);

  useEffect(() => {
    if (isEndGame) isWinner ? winSound.play() : loseSound.play();
  }, [isEndGame, isWinner]);
  // <--

  // Ver de hacerlo global y meterlo con GlobalProvider
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
  //

  return (
    <>
      <div className={styles.grid}>
        {triesCount &&
          gridRows.map(({ id }, idx) => (
            <Row
              key={id}
              idx={idx}
              setGlobalWordArrayValidation={handleGlobalWordArray}
              ref={(ref: HTMLDivElement) => (rowRefs.current[idx] = ref)}
            />
          ))}
      </div>
      <Keyboard
        globalWordArrayValidation={globalWordArrayValidation}
        activeRow={rowRefs.current[activeRowIdx]}
      />
    </>
  );
};

export default Grid;
