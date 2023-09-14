import React from "react";
import { fireEvent, act } from "@testing-library/react";
import { Row } from "./Row";
import { renderWithContext, withContext } from "../../test-utils";
import * as useKeyUp from "../hooks/useKeyUp";

interface RowProps {
  idx: number;
  rowWord: string[];
  setRowsWord: () => void;
  ref: React.MutableRefObject<HTMLDivElement>;
}

interface MockValueContext {
  setActiveRowIdx: (x: number) => void;
  randomWord: string;
  wordLength: number;
  activeRowIdx: number;
  setIsWinner: (x: boolean) => void;
  setIsEndGame: (x: boolean) => void;
}

describe("<Row />", () => {
  const setRowsWord = jest.fn();
  const setActiveRowIdx = jest.fn();
  const setIsWinner = jest.fn();
  const setIsEndGame = jest.fn();

  let rowProps: RowProps = {
    idx: 0,
    rowWord: [],
    setRowsWord: setRowsWord,
    ref: { current: document.createElement("div") },
  };

  let mockValueContext: MockValueContext = {
    setActiveRowIdx,
    randomWord: "test",
    wordLength: 4,
    activeRowIdx: 0,
    setIsWinner,
    setIsEndGame,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(
      <Row {...rowProps} />,
      mockValueContext
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly the quantity of LetterBlocks depending on the wordLength value", () => {
    const wordLength = 8;
    mockValueContext.wordLength = wordLength;

    const { queryAllByTestId } = renderWithContext(
      <Row {...rowProps} />,
      mockValueContext
    );

    const letterBlocks = queryAllByTestId("letterBlock");

    expect(letterBlocks.length).toBe(wordLength);
  });

  it("should setIsWinner and setIsEndGame as true when the word is correct", () => {
    const ref = { current: document.createElement("div") };
    rowProps.ref = ref;

    const handleKeyUp = jest.fn();

    jest.spyOn(useKeyUp, "useKeyUp").mockImplementation(() => ({
      handleKeyUp,
      wordInputValidation: [],
    }));

    const { rerender } = renderWithContext(
      <Row {...rowProps} />,
      mockValueContext
    );

    act(() => {
      fireEvent.keyUp(ref.current, { key: "Enter", bubbles: true });
      expect(handleKeyUp).toHaveBeenCalledTimes(1);
      jest.spyOn(useKeyUp, "useKeyUp").mockImplementation(() => ({
        handleKeyUp,
        wordInputValidation: [
          { value: 1, ocurrences: 2, letter: "t" },
          { value: 1, ocurrences: 1, letter: "e" },
          { value: 1, ocurrences: 1, letter: "s" },
          { value: 1, ocurrences: 2, letter: "t" },
        ],
      }));
    });

    act(() => {
      rerender(withContext(<Row {...rowProps} />, mockValueContext));
    });

    expect(setIsWinner).toHaveBeenCalledTimes(1);
    expect(setIsEndGame).toHaveBeenCalledTimes(1);
  });
});
