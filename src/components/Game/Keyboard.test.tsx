import React from "react";
import { fireEvent, act } from "@testing-library/react";
import { Keyboard } from "./Keyboard";
import { renderWithContext } from "../../test-utils";

interface KeyboardProps {
  rowRefs: React.MutableRefObject<HTMLDivElement[]>;
  keyboardPreview: string[];
}

interface MockValueContext {
  globalWordValidation: {};
  activeRowIdx: number;
}

describe("<Keyboard />", () => {
  let keyboardProps: KeyboardProps = {
    rowRefs: { current: [document.createElement("div")] },
    keyboardPreview: [],
  };

  const mockValueContext: MockValueContext = {
    globalWordValidation: {},
    activeRowIdx: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(
      <Keyboard {...keyboardProps} />,
      mockValueContext
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should dispatch keyup event when click keyboard letter", () => {
    const activeRowIdx = mockValueContext.activeRowIdx;
    const rowRefs = { current: [document.createElement("div")] };
    keyboardProps.rowRefs = rowRefs;

    rowRefs.current[activeRowIdx].onkeyup = jest.fn();

    const { getByTestId } = renderWithContext(
      <Keyboard {...keyboardProps} />,
      mockValueContext
    );

    const keyboardButtonA = getByTestId("a");

    act(() => {
      fireEvent.click(keyboardButtonA);
    });

    expect(rowRefs.current[activeRowIdx].onkeyup).toHaveBeenCalledTimes(1);
  });
});
