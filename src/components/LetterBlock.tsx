import * as cn from "classnames";
import { useCallback, useEffect, useRef } from "react";
import "./LetterBlock.css";
import { ValidationArray } from "./utils";

interface LetterBlockProps {
  focusable: boolean;
  isFocused: boolean;
  value: string;
  idx: number;
  inputValidation: ValidationArray;
  setFocusedInputIdx: (idx: number) => void;
}

export const LetterBlock = ({
  focusable,
  isFocused,
  value,
  idx,
  inputValidation,
  setFocusedInputIdx,
}: LetterBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    focusable && isFocused && blockRef?.current?.focus();
  }, [isFocused, focusable]);

  const handleClick = useCallback(() => {
    focusable && blockRef?.current?.focus();
  }, [focusable, blockRef]);

  const handleFocus = useCallback(() => {
    focusable && setFocusedInputIdx(idx);
  }, [focusable]);

  return (
    <div
      className={cn(
        "letterBlock",
        { disabled: !focusable },
        { focused: isFocused },
        { green: inputValidation?.value === 1 },
        { yellow: inputValidation?.value === 0 },
        { black: inputValidation?.value === -1 }
      )}
      tabIndex={-1}
      ref={blockRef}
      onClick={handleClick}
      onFocus={handleFocus}
    >
      {inputValidation && (
        <span className="ocurrences">x{inputValidation?.ocurrences}</span>
      )}
      {value}
    </div>
  );
};
