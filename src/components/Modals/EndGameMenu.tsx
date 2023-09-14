import { useContext } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import { Modal } from "./Modal";

export const EndGameMenu = () => {
  const { isEndGame, isWinner, activeRowIdx, randomWord, restartGame } =
    useContext<IAppContext>(AppContext);

  return (
    <Modal isOpen={isEndGame} showCloseButton={false}>
      <div data-testid="endGameMenu">
        {isWinner ? (
          <>
            <h3>You Win! 🥳 </h3>
            <p>{`You did it in just ${activeRowIdx} tries`}</p>
          </>
        ) : (
          <>
            <h3>You Lose! 😰</h3>
            <p>
              The word was: <strong>{randomWord.toUpperCase()}</strong>
            </p>
          </>
        )}
        <div>
          <button onClick={restartGame}>
            {isWinner ? "Play Again?" : "Another Try?"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
