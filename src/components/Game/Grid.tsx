import { useRef, useContext, useState, useCallback } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import styles from "./Grid.module.scss";
import { Keyboard } from "./Keyboard";
import { Row } from "./Row";
import useClickOutside from "../hooks/useClickOutside";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import { Hints } from "./Hints";

export const Grid = ({}) => {
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [rowsWord, setRowsWord] = useState<string[][]>([]);

  const { activeRowIdx, triesCount } = useContext<IAppContext>(AppContext);

  const { objectList: gridRows } = useCreateObjectList({ length: triesCount });

  useClickOutside({ rowRefs, activeRowIdx });

  const handleRowWord = useCallback(
    (rW: string[], idx: number) => {
      const newRowsWord = [...rowsWord];
      newRowsWord[idx] = rW;
      setRowsWord(newRowsWord);
    },
    [rowsWord]
  );

  return (
    <>
      <div className={styles.panel} data-testid="grid">
        <div className={styles.left}>
          <div className={styles.grid}>
            {triesCount &&
              gridRows.map(({ id }, idx) => (
                <div key={id} data-testid="gridRow">
                  <Row
                    key={id}
                    data-testid="gridRow"
                    idx={idx}
                    rowWord={rowsWord[idx]}
                    setRowsWord={(rowWord: string[]) =>
                      handleRowWord(rowWord, idx)
                    }
                    ref={(ref: HTMLDivElement) => (rowRefs.current[idx] = ref)}
                  />
                </div>
              ))}
          </div>
          <Keyboard
            rowRefs={rowRefs}
            keyboardPreview={rowsWord[activeRowIdx]}
          />
        </div>
        <div className={styles.right}>
          <Hints />
        </div>
      </div>
    </>
  );
};

export default Grid;
