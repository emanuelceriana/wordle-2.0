import { render, screen, fireEvent, act } from "@testing-library/react";
import { HelpMenu, SimpleExplanation, LetterExplanation } from "./HelpMenu";
import { renderWithContext } from "../../test-utils";

interface MockValueContext {
  isHelpMenuOpen: boolean;
  setIsHelpMenuOpen: () => void;
}

describe("<HelpMenu />", () => {
  const setIsHelpMenuOpenMock = jest.fn();

  let mockValueContext: MockValueContext = {
    isHelpMenuOpen: true,
    setIsHelpMenuOpen: setIsHelpMenuOpenMock,
  };

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(<HelpMenu />, mockValueContext);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be closed if helMenuOpen is false", () => {
    mockValueContext.isHelpMenuOpen = false;

    const { queryByTestId } = renderWithContext(<HelpMenu />, mockValueContext);

    const helpMenu = queryByTestId("helpMenu");

    expect(helpMenu).toBe(null);
  });
  it("should be open if helMenuOpen is true", () => {
    mockValueContext.isHelpMenuOpen = true;

    const { getByTestId } = renderWithContext(<HelpMenu />, mockValueContext);

    const helpMenu = getByTestId("helpMenu");

    expect(helpMenu).toBeDefined();
  });
  it("should call onCloseRequest when close button is clicked", () => {
    const { getByRole } = renderWithContext(<HelpMenu />, mockValueContext);

    const closeButton = getByRole("button");

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(mockValueContext.setIsHelpMenuOpen).toHaveBeenCalledWith(false);
  });
});

describe("SimpleExplanation", () => {
  it("renders children", () => {
    render(<SimpleExplanation>Test Explanation</SimpleExplanation>);
    const explanationElement = screen.getByText("Test Explanation");
    expect(explanationElement).toBeInTheDocument();
  });
});

describe("LetterExplanation", () => {
  it("renders letter and children", () => {
    render(
      <LetterExplanation letter="A">Test Letter Explanation</LetterExplanation>
    );
    const letterElement = screen.getByText("A");
    const explanationElement = screen.getByText("Test Letter Explanation");

    expect(letterElement).toBeInTheDocument();
    expect(explanationElement).toBeInTheDocument();
  });

  it("applies the specified color", () => {
    render(
      <LetterExplanation color="green" letter="B">
        Test Color Explanation
      </LetterExplanation>
    );
    const letterElement = screen.getByText("B");

    expect(letterElement).toHaveClass("helpMenu__caseBlock-green");
  });

  it("renders ocurrences if specified", () => {
    render(
      <LetterExplanation hasOcurrences={true} ocurrences={3} letter="C">
        Test Occurrences Explanation
      </LetterExplanation>
    );
    const ocurrencesElement = screen.getByText("x3");

    expect(ocurrencesElement).toBeInTheDocument();
  });
});
