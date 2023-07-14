import {
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import KeyboardSound from "../../assets/keyboardSound.wav";
import NextWordSound from "../../assets/nextWordSound.wav";
import { IAppContext, AppContext } from "../../context/AppContext";
import { ValidationArray, getAmountOfLetters, validateWord } from "../utils";

interface KeyDownProps {
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

const useKeyDown = ({
  isRowActive,
  setFocusedInputIdx,
  setActiveRowIdx,
  activeRowIdx,
  inputValues,
  setInputValues,
  focusedInputIdx,
  wordLength,
  randomWord,
}: KeyDownProps) => {
  const [wordArrayValidation, setWordArrayValidation] = useState<
    ValidationArray[]
  >([]);

  const ks = new Audio(KeyboardSound);
  const nw = new Audio(NextWordSound);

  const { isSoundFxActive } = useContext<IAppContext>(AppContext);

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = useCallback(
    (e: KeyboardEvent) => {
      if (isRowActive) {
        const keyPressed = e.key.toLowerCase();
        if (
          keyPressed === "enter" &&
          getAmountOfLetters(inputValues) === wordLength
        ) {
          setWordArrayValidation(validateWord(randomWord, inputValues));
          setFocusedInputIdx(0);
          setActiveRowIdx(activeRowIdx + 1);
          isSoundFxActive && nw.play();
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
          isSoundFxActive && ks.play();
        } else if (/^[a-z]$/.test(keyPressed)) {
          const updatedValues = [...inputValues];
          updatedValues[focusedInputIdx] = keyPressed;
          setInputValues(updatedValues);
          isSoundFxActive && ks.play();
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
      setActiveRowIdx,
      isSoundFxActive,
    ]
  );

  return {
    handleKeyDown,
    wordArrayValidation,
  };
};

export default useKeyDown;
