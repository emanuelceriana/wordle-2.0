import {
  faArrowTurnDown,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { GlobalWordArray } from "./Grid";
import "./Keyboard.css";
import { useCreateObjectList } from "./hooks/useCreateObjectList";

interface KeyboardProps {
  globalWordArrayValidation: GlobalWordArray;
  activeRow: HTMLDivElement | null;
}

export const Keyboard = ({
  globalWordArrayValidation,
  activeRow,
}: KeyboardProps) => {
  const keyboardButtons = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "enter",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "backspace",
  ];

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
    <div className="keyboard">
      {keyboardButtonsIds.map(({ id }, idx) => (
        <div
          key={id}
          className={cn(
            "keyboardButton",
            { green: globalWordArrayValidation[keyboardButtons[idx]] === 1 },
            { yellow: globalWordArrayValidation[keyboardButtons[idx]] === 0 },
            { black: globalWordArrayValidation[keyboardButtons[idx]] === -1 }
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
