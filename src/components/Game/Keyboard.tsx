import {
  faArrowTurnDown,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { keyboardButtons } from "./constants";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import { GlobalWordArray } from "./Grid";
import styles from "./Keyboard.module.scss";

interface KeyboardProps {
  globalWordArrayValidation: GlobalWordArray;
  activeRow: HTMLDivElement | null;
}

export const Keyboard = ({
  globalWordArrayValidation,
  activeRow,
}: KeyboardProps) => {
  const { objectList: keyboardButtonsIds } = useCreateObjectList({
    length: keyboardButtons.length,
  });

  const handleClick = (letter: string) => {
    const event = new KeyboardEvent("keydown", {
      key: letter,
      bubbles: true,
    });

    activeRow?.dispatchEvent(event);
  };

  return (
    <div className={styles.keyboard}>
      {keyboardButtonsIds.map(({ id }, idx) => (
        <div
          key={id}
          className={cn(
            styles.keyboardButton,
            {
              [styles["keyboardButton__green"]]:
                globalWordArrayValidation[keyboardButtons[idx]] === 1,
            },
            {
              [styles["keyboardButton__yellow"]]:
                globalWordArrayValidation[keyboardButtons[idx]] === 0,
            },
            {
              [styles["keyboardButton__black"]]:
                globalWordArrayValidation[keyboardButtons[idx]] === -1,
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
