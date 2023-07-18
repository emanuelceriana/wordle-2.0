import cn from "classnames";
import { useCallback, useEffect, useRef } from "react";
import { ValidationArray } from "../../utils";
import styles from "./LetterBlock.module.scss";

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
        styles.letterBlock,
        { [styles.disabled]: !focusable },
        { [styles.focused]: isFocused },
        {
          [styles["letterBlock__green"]]: inputValidation?.value === 1,
        },
        {
          [styles["letterBlock__yellow"]]: inputValidation?.value === 0,
        },
        {
          [styles["letterBlock__black"]]: inputValidation?.value === -1,
        }
      )}
      tabIndex={-1}
      ref={blockRef}
      onClick={handleClick}
      onFocus={handleFocus}
    >
      {inputValidation && (
        <span className={styles.ocurrences}>
          x{inputValidation?.ocurrences}
        </span>
      )}
      {value}
    </div>
  );
};
