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
  inputValues: string[];
  setInputValues: (inputValues: string[]) => void;
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
  inputValues,
  setInputValues,
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

  const validate = (randomWord: string, inputValues: string[]) => {
    handleGlobalWordValidation(validateWord(randomWord, inputValues));
    setWordInputValidation(validateWord(randomWord, inputValues));
  };

  const checkHardMode = useCallback(async () => {
    let next = true;
    if (userSettings.isHardModeActive) {
      const isValidRealWord = await validateRealWord(inputValues.join(""));
      if (!isValidRealWord) {
        setNotification(hardModeMessageError);
      }
      next = isValidRealWord;
    }
    return next;
  }, [inputValues, userSettings, validateRealWord, setNotification]);

  const handleKeyUp: KeyboardEventHandler<HTMLElement> = useCallback(
    async (e: KeyboardEvent) => {
      if (isRowActive) {
        const keyPressed = e.key.toLowerCase();
        if (
          keyPressed === "enter" &&
          getAmountOfLetters(inputValues) === wordLength
        ) {
          if (await checkHardMode()) {
            validate(randomWord, inputValues);
            setFocusedInputIdx(0);
            setActiveRowIdx(activeRowIdx + 1);
            playSound(playlist.Try);
          }
        } else if (keyPressed === "backspace") {
          if (
            inputValues[focusedInputIdx] &&
            inputValues[focusedInputIdx] !== ""
          ) {
            const updatedValues = [...inputValues];
            updatedValues[focusedInputIdx] = "";
            setInputValues(updatedValues);
          } else if (
            (!inputValues[focusedInputIdx] ||
              inputValues[focusedInputIdx] === "") &&
            focusedInputIdx > 0
          ) {
            setFocusedInputIdx(focusedInputIdx - 1);
          }
          playSound(playlist.Keyboard);
        } else if (/^[a-z]$/.test(keyPressed)) {
          const updatedValues = [...inputValues];
          updatedValues[focusedInputIdx] = keyPressed;
          setInputValues(updatedValues);
          playSound(playlist.Keyboard);
          if (focusedInputIdx < wordLength - 1) {
            setFocusedInputIdx(focusedInputIdx + 1);
          }
        }
      }
    },
    [
      isRowActive,
      inputValues,
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
