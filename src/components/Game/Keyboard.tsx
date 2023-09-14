import { useCallback, useContext, useMemo, useState } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import {
  faArrowTurnDown,
  faDeleteLeft,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";
import { keyboardButtons, keyboardButtonsMobile } from "./constants";
import { useCreateObjectList } from "../hooks/useCreateObjectList";
import styles from "./Keyboard.module.scss";
import { isMobile } from "react-device-detect";

interface KeyboardProps {
  rowRefs: React.MutableRefObject<HTMLDivElement[]>;
  keyboardPreview: string[];
}

export const Keyboard = ({ rowRefs, keyboardPreview }: KeyboardProps) => {
  const [isHiddenKeyboard, setIsHiddenKeyboard] = useState(false);
  const { globalWordValidation, activeRowIdx } =
    useContext<IAppContext>(AppContext);

  const keyboard = useMemo(() => {
    return isMobile ? keyboardButtonsMobile : keyboardButtons;
  }, [isMobile]);

  const { objectList: keyboardButtonsIds } = useCreateObjectList({
    length: keyboard.length,
  });

  const handleClick = useCallback(
    (letter: string) => {
      const event = new KeyboardEvent("keyup", {
        key: letter,
        bubbles: true,
      });

      rowRefs.current[activeRowIdx].dispatchEvent(event);
    },
    [rowRefs, activeRowIdx]
  );

  return (
    <div
      className={cn(styles.keyboard, {
        [styles.isHiddenKeyboard]: isHiddenKeyboard,
      })}
    >
      {isMobile && (
        <>
          <div
            data-testid="hideMobileKeyboard"
            className={styles.mobileVisibilityControl}
            onClick={() => setIsHiddenKeyboard(!isHiddenKeyboard)}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className={styles.keyboardPreview}>
            {keyboardPreview?.join("")}
          </div>
        </>
      )}
      {keyboardButtonsIds.map(({ id }, idx) => (
        <div
          key={id}
          id={keyboard[idx]}
          data-testid={keyboard[idx]}
          className={cn(
            styles.keyboardButton,
            { [styles.backspace]: keyboard[idx] === "backspace" },
            { [styles.enter]: keyboard[idx] === "enter" },
            {
              [styles["keyboardButton__green"]]:
                globalWordValidation[keyboard[idx]] === 1,
            },
            {
              [styles["keyboardButton__yellow"]]:
                globalWordValidation[keyboard[idx]] === 0,
            },
            {
              [styles["keyboardButton__black"]]:
                globalWordValidation[keyboard[idx]] === -1,
            }
          )}
          onClick={() => handleClick(keyboard[idx])}
        >
          {keyboard[idx] === "backspace" ? (
            <FontAwesomeIcon icon={faDeleteLeft} />
          ) : keyboard[idx] === "enter" ? (
            <FontAwesomeIcon icon={faArrowTurnDown} />
          ) : (
            keyboard[idx]
          )}
        </div>
      ))}
    </div>
  );
};
