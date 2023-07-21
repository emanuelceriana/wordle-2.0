import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LetterBlock } from "./LetterBlock";
import { ValidationArray } from "../../utils";

interface LetterBlockProps {
  focusable: boolean;
  isFocused: boolean;
  value: string;
  idx: number;
  inputValidation: ValidationArray;
  setFocusedInputIdx: (idx: number) => void;
}

describe("<LetterBlock />", () => {
  const letterBlockProps: LetterBlockProps = {
    focusable: true,
    isFocused: false,
    value: "a",
    idx: 0,
    inputValidation: { letter: "a", ocurrences: 0, value: 1 },
    setFocusedInputIdx: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    letterBlockProps.focusable = true;
    letterBlockProps.inputValidation = { letter: "a", ocurrences: 0, value: 1 };
  });

  it("should render without errors", () => {
    const { asFragment } = render(<LetterBlock {...letterBlockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should be focusable if isFocusable is true", () => {
    render(<LetterBlock {...letterBlockProps} />);

    const letterBlock = screen.getByTestId("letterBlock");

    act(() => {
      fireEvent.click(letterBlock);
    });

    expect(document.activeElement).toStrictEqual(letterBlock);
  });
  it("should not be focusable if isFocusable is false", () => {
    letterBlockProps.focusable = false;

    render(<LetterBlock {...letterBlockProps} />);

    const letterBlock = screen.getByTestId("letterBlock");

    act(() => {
      fireEvent.click(letterBlock);
    });

    expect(document.activeElement).not.toStrictEqual(letterBlock);
  });
  it("should call setFocusedInputIdx when gain focus", () => {
    render(<LetterBlock {...letterBlockProps} />);

    const letterBlock = screen.getByTestId("letterBlock");

    act(() => {
      fireEvent.click(letterBlock);
    });

    expect(letterBlockProps.setFocusedInputIdx).toHaveBeenCalledTimes(1);
  });
  it("should be green if the inputValidation has value 1 (correct letter, correct position)", () => {
    letterBlockProps.value = "e";
    letterBlockProps.inputValidation = { letter: "e", ocurrences: 0, value: 1 };
    render(<LetterBlock {...letterBlockProps} />);

    const letterBlock = screen.getByTestId("letterBlock");

    expect(letterBlock.classList.contains("letterBlock__green")).toBe(true);
  });
  it("should be yellow if the inputValidation has value 0 (only correct letter)", () => {
    letterBlockProps.value = "d";
    letterBlockProps.inputValidation = { letter: "d", ocurrences: 0, value: 0 };
    render(<LetterBlock {...letterBlockProps} />);

    const letterBlock = screen.getByTestId("letterBlock");

    expect(letterBlock.classList.contains("letterBlock__yellow")).toBe(true);
  });
  it("should be black if the inputValidation has value -1 (the random word not contain the letter)", () => {
    letterBlockProps.value = "x";
    letterBlockProps.inputValidation = {
      letter: "x",
      ocurrences: 0,
      value: -1,
    };
    render(<LetterBlock {...letterBlockProps} />);

    const letterBlock = screen.getByTestId("letterBlock");

    expect(letterBlock.classList.contains("letterBlock__black")).toBe(true);
  });
  it("should render the value correctly", () => {
    letterBlockProps.value = "H";

    const { getByText } = render(<LetterBlock {...letterBlockProps} />);

    expect(getByText(letterBlockProps.value)).toBeInTheDocument();
  });
  it("should render the ocurrences correctly", () => {
    letterBlockProps.inputValidation = { letter: "d", ocurrences: 2, value: 0 };

    const { getByText } = render(<LetterBlock {...letterBlockProps} />);

    expect(
      getByText(`x${letterBlockProps.inputValidation.ocurrences}`)
    ).toBeInTheDocument();
  });
  it("should not render ourrences if inputValidation is undefined", () => {
    letterBlockProps.inputValidation = undefined as unknown as ValidationArray;

    const { queryByTestId } = render(<LetterBlock {...letterBlockProps} />);

    expect(queryByTestId("letterBlockOcurrences")).toBeNull();
  });
  it("should call focus to the ref if isFocused and focusable are true", async () => {
    letterBlockProps.isFocused = true;

    jest.spyOn(React, "useEffect").mockImplementation((effect) => effect());
    const mockFocus = jest.fn();
    jest
      .spyOn(React, "useRef")
      .mockReturnValue({ current: { focus: mockFocus } });

    render(<LetterBlock {...letterBlockProps} />);

    act(() => {
      expect(mockFocus).toHaveBeenCalledTimes(1);
    });
  });
});
