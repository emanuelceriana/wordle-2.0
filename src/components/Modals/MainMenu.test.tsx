import { act, fireEvent } from "@testing-library/react";
import { MainMenu } from "./MainMenu";
import { renderWithContext } from "../../test-utils";

interface MockValueContext {
  isMainMenuOpen: boolean;
  setWordLength: () => void;
  setTriesCount: () => void;
  startGame: () => void;
}

describe("<MainMenu />", () => {
  const startGameMock = jest.fn();

  let mockValueContext: MockValueContext = {
    isMainMenuOpen: true,
    setWordLength: () => {},
    setTriesCount: () => {},
    startGame: startGameMock,
  };

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(<MainMenu />, mockValueContext);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be closed if mainMenu is false", () => {
    mockValueContext.isMainMenuOpen = false;

    const { queryByTestId } = renderWithContext(<MainMenu />, mockValueContext);

    const mainMenu = queryByTestId("mainMenu");

    expect(mainMenu).toBe(null);
  });
  it("should be open if helMenuOpen is true", () => {
    mockValueContext.isMainMenuOpen = true;

    const { getByTestId } = renderWithContext(<MainMenu />, mockValueContext);

    const mainMenu = getByTestId("mainMenu");

    expect(mainMenu).toBeDefined();
  });
  it("should call startGame when Start Game button is clicked", () => {
    const { getByText } = renderWithContext(<MainMenu />, mockValueContext);

    const startGameButton = getByText("Start Game");

    act(() => {
      fireEvent.click(startGameButton);
    });

    expect(mockValueContext.startGame).toHaveBeenCalledTimes(1);
  });
});
