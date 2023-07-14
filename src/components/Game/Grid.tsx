import { useRef, useContext } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import styles from "./Grid.module.scss";
import { Keyboard } from "./Keyboard";
import { Row } from "./Row";
import useClickOutside from "../hooks/useClickOutside";
import { useCreateObjectList } from "../hooks/useCreateObjectList";

export const Grid = ({}) => {
  const rowRefs = useRef<HTMLDivElement[]>([]);

  const { activeRowIdx, triesCount } = useContext<IAppContext>(AppContext);

  const { objectList: gridRows } = useCreateObjectList({ length: triesCount });

  useClickOutside({ rowRefs, activeRowIdx });

  return (
    <>
      <div className={styles.grid}>
        {triesCount &&
          gridRows.map(({ id }, idx) => (
            <Row
              key={id}
              idx={idx}
              ref={(ref: HTMLDivElement) => (rowRefs.current[idx] = ref)}
            />
          ))}
      </div>
      <Keyboard rowRefs={rowRefs} />
    </>
  );
};

export default Grid;
