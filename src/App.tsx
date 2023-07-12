import { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import Modal from "./components/Modal";
import { RangeSlider } from "./components/RangeSlider";
import WordLengthSelector from "./components/WordLengthSelector";

const defaultWordLength = 5;
const defaultTryCount = 6;

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [tryCount, setTryCount] = useState(defaultTryCount);
  const [wordLength, setWordLength] = useState(defaultWordLength);
  const [isGridReady, setIsGridReady] = useState(false);

  const handleStartGame = () => {
    setIsPopupOpen(false);
    setIsGridReady(true);
  };

  const restartGame = () => {
    setIsGridReady(false);
    setTryCount(defaultTryCount);
    setWordLength(defaultWordLength);
    setIsPopupOpen(true);
  };

  return (
    <>
      {isGridReady && (
        <Grid
          wordLength={wordLength}
          tryCount={tryCount}
          restartGame={restartGame}
        />
      )}
      <Modal isOpen={isPopupOpen} showCloseButton={false}>
        <div>
          <h3>Welcome to Wordle 2.0</h3>
          <p style={{ whiteSpace: "pre-line" }}>
            {`The well known game but with an awesome feature
          You can select the length of the word to guess and the amount of tries!`}
          </p>

          <WordLengthSelector
            defaultValue={defaultWordLength.toString()}
            onClickRequest={setWordLength}
          />
          <RangeSlider
            defaultValue={defaultTryCount}
            onChangeRequest={setTryCount}
          />
          <div>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
