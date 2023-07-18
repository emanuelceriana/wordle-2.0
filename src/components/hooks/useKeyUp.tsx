import {
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";

import { AppContext, IAppContext } from "../../context/AppContext";
import { getAmountOfLetters, validateWord, ValidationArray } from "../../utils";

interface KeyUpProps {
  isRowActive: boolean;
  setFocusedInputIdx: (idx: number) => void;
  setActiveRowIdx: (idx: number) => void;
  activeRowIdx: number;
  rowWord: string[];
  setRowsWord: (x: string[]) => void;
  focusedInputIdx: number;
  wordLength: number;
  randomWord: string;
}

const hardModeMessageError = (
  <>
    <b>Hard Mode:</b> The word is not a valid word.
  </>
);

const useKeyUp = ({
  isRowActive,
  setFocusedInputIdx,
  setActiveRowIdx,
  activeRowIdx,
  rowWord,
  setRowsWord,
  focusedInputIdx,
  wordLength,
  randomWord,
}: KeyUpProps) => {
  const [wordInputValidation, setWordInputValidation] = useState<
    ValidationArray[]
  >([]);
  const {
    playlist,
    userSettings,
    playSound,
    handleGlobalWordValidation,
    validateRealWord,
    setNotification,
  } = useContext<IAppContext>(AppContext);

  const validate = (randomWord: string, rowWord: string[]) => {
    handleGlobalWordValidation(validateWord(randomWord, rowWord));
    setWordInputValidation(validateWord(randomWord, rowWord));
  };

  const checkHardMode = useCallback(async () => {
    let next = true;
    if (userSettings.isHardModeActive) {
      const isValidRealWord = await validateRealWord(rowWord.join(""));
      if (!isValidRealWord) {
        setNotification(hardModeMessageError);
      }
      next = isValidRealWord;
    }
    return next;
  }, [rowWord, userSettings, validateRealWord, setNotification]);

  const handleKeyUp: KeyboardEventHandler<HTMLElement> = useCallback(
    async (e: KeyboardEvent) => {
      if (isRowActive) {
        const keyPressed = e.key.toLowerCase();
        if (
          keyPressed === "enter" &&
          getAmountOfLetters(rowWord) === wordLength
        ) {
          if (await checkHardMode()) {
            validate(randomWord, rowWord);
            setFocusedInputIdx(0);
            setActiveRowIdx(activeRowIdx + 1);
            playSound(playlist.Try);
          }
        } else if (keyPressed === "backspace") {
          if (rowWord[focusedInputIdx] && rowWord[focusedInputIdx] !== "") {
            const updatedValues = [...rowWord];
            updatedValues[focusedInputIdx] = "";
            setRowsWord(updatedValues);
          } else if (
            (!rowWord[focusedInputIdx] || rowWord[focusedInputIdx] === "") &&
            focusedInputIdx > 0
          ) {
            setFocusedInputIdx(focusedInputIdx - 1);
          }
          playSound(playlist.Keyboard);
        } else if (/^[a-z]$/.test(keyPressed)) {
          const updatedValues = rowWord ? [...rowWord] : [];
          updatedValues[focusedInputIdx] = keyPressed;
          setRowsWord(updatedValues);
          playSound(playlist.Keyboard);
          if (focusedInputIdx < wordLength - 1) {
            setFocusedInputIdx(focusedInputIdx + 1);
          }
        }
      }
    },
    [
      isRowActive,
      rowWord,
      focusedInputIdx,
      userSettings,
      setActiveRowIdx,
      playSound,
      checkHardMode,
    ]
  );

  return {
    handleKeyUp,
    wordInputValidation,
  };
};

export default useKeyUp;
