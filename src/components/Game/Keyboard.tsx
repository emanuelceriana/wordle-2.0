import { useCallback, useContext } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import {
  faArrowTurnDown,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { keyboardButtons } from "./constants";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import styles from "./Keyboard.module.scss";

interface KeyboardProps {
  rowRefs: React.MutableRefObject<HTMLDivElement[]>;
}

export const Keyboard = ({ rowRefs }: KeyboardProps) => {
  const { globalWordValidation, activeRowIdx } =
    useContext<IAppContext>(AppContext);
  const { objectList: keyboardButtonsIds } = useCreateObjectList({
    length: keyboardButtons.length,
  });

  const handleClick = useCallback(
    (letter: string) => {
      const event = new KeyboardEvent("keydown", {
        key: letter,
        bubbles: true,
      });

      rowRefs.current[activeRowIdx].dispatchEvent(event);
    },
    [rowRefs]
  );

  return (
    <div className={styles.keyboard}>
      {keyboardButtonsIds.map(({ id }, idx) => (
        <div
          key={id}
          className={cn(
            styles.keyboardButton,
            {
              [styles["keyboardButton__green"]]:
                globalWordValidation[keyboardButtons[idx]] === 1,
            },
            {
              [styles["keyboardButton__yellow"]]:
                globalWordValidation[keyboardButtons[idx]] === 0,
            },
            {
              [styles["keyboardButton__black"]]:
                globalWordValidation[keyboardButtons[idx]] === -1,
            }
          )}
          onClick={() => handleClick(keyboardButtons[idx])}
        >
          {keyboardButtons[idx] === "backspace" ? (
            <FontAwesomeIcon icon={faDeleteLeft} />
          ) : keyboardButtons[idx] === "enter" ? (
            <FontAwesomeIcon icon={faArrowTurnDown} />
          ) : (
            keyboardButtons[idx]
          )}
        </div>
      ))}
    </div>
  );
};
