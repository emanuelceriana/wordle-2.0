import { EndGameMenu } from "./EndGameMenu";
import { renderWithContext } from "../../test-utils";

interface MockValueContext {
  isEndGame: boolean;
  isWinner: boolean;
  activeRowIdx: number;
  randomWord: string;
  restartGame: () => void;
}

describe("<EndGameMenu />", () => {
  const restartGame = jest.fn();

  let mockValueContext: MockValueContext = {
    isEndGame: true,
    isWinner: true,
    activeRowIdx: 0,
    randomWord: "test",
    restartGame,
  };

  it("should render without errors", () => {
    const { asFragment } = renderWithContext(<EndGameMenu />, mockValueContext);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be closed if is not end of the game", () => {
    mockValueContext.isEndGame = false;

    const { queryByTestId } = renderWithContext(
      <EndGameMenu />,
      mockValueContext
    );

    const endGameMenu = queryByTestId("endGameMenu");

    expect(endGameMenu).toBe(null);
  });
  it("should be opened if it is the end of the game", () => {
    mockValueContext.isEndGame = true;

    const { getByTestId } = renderWithContext(
      <EndGameMenu />,
      mockValueContext
    );

    const endGameMenu = getByTestId("endGameMenu");

    expect(endGameMenu).toBeDefined();
  });

  it("should show the winner message if the user wins", () => {
    mockValueContext.isEndGame = true;
    mockValueContext.isWinner = true;
    const winnerMessage = "You Win! 🥳";

    const { getByText } = renderWithContext(<EndGameMenu />, mockValueContext);

    const winnerMessageElement = getByText(winnerMessage);

    expect(winnerMessageElement).toBeInTheDocument();
  });

  it("should show the loser message if the user lose", () => {
    mockValueContext.isEndGame = true;
    mockValueContext.isWinner = false;
    const loserMessage = "You Lose! 😰";

    const { getByText } = renderWithContext(<EndGameMenu />, mockValueContext);

    const loserMessageElement = getByText(loserMessage);

    expect(loserMessageElement).toBeInTheDocument();
  });
});
