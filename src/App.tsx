import { useState, useContext } from "react";
import AppContext from "./context/AppContext";
import "./App.css";
import { Grid } from "./components/Grid";
import Modal from "./components/Modal";
import { RangeSlider } from "./components/RangeSlider";
import WordLengthSelector from "./components/WordLengthSelector";
import { Navbar } from "./components/Navbar";
import cn from "classnames";
import { ToggleButton } from "./components/ToggleButton";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalProvider, IAppContext } from "./providers/GlobalProvider.tsx";

const defaultWordLength = 5;
const defaultTryCount = 6;

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [tryCount, setTryCount] = useState(defaultTryCount);
  const [wordLength, setWordLength] = useState(defaultWordLength);
  const [isGridReady, setIsGridReady] = useState(false);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false);
  const { isSoundFxActive, setIsSoundFxActive } =
    useContext<IAppContext>(AppContext);

  const handleStartGame = () => {
    setIsPopupOpen(false);
    setIsGridReady(true);
  };

  const restartGame = () => {
    setIsGridReady(false);
    setTryCount(defaultTryCount);
    setWordLength(defaultWordLength);
    setIsSettingsPopupOpen(false);
    setIsPopupOpen(true);
  };

  return (
    <>
      <Navbar
        onClickHelp={() => setIsHelpPopupOpen(true)}
        onClickSettings={() => setIsSettingsPopupOpen(true)}
      />
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
      <Modal
        isOpen={isHelpPopupOpen}
        onCloseRequest={() => setIsHelpPopupOpen(false)}
        showCloseButton={true}
        title="Help"
      >
        <div className="helpTable">
          <div className="explanation">
            To start playing you need just to write a word with the length of
            the squares availables, you can use the virtual keyboard if you
            want.
          </div>
          <div className="explanation">
            <b>Easy Mode:</b> For each try you don't need to write word. A chain
            of characters is valid. It's easy and boring. 🥱 <i>ASDASD</i>{" "}
            should work.
          </div>
          <div className="explanation">
            <b>Hard Mode:</b> For each try you need to write a real word. It's
            harder and exciting. 🔥 Did you know that <i>QWERTY</i> is accepted
            by Merriam-Webster dictionary?
          </div>
          <div className="caseBlock">
            <div className="fakeLetterBlock green">W</div>
            <div className="explanation">
              If green it means that the word has this letter and it is in the
              correct position.
            </div>
          </div>
          <div className="caseBlock">
            <div className="fakeLetterBlockyellow">O</div>
            <div className="explanation">
              If yellow it means that the word has this letter but it is not in
              the correct position.
            </div>
          </div>
          <div className="caseBlock">
            <div className="fakeLetterBlockblack">R</div>
            <div className="explanation">
              If black it means that the word has not this letter.
            </div>
          </div>
          <div className="caseBlock">
            <div className={cn("fakeLetterBlock")}>
              <span className="ocurrences">x2</span>D
            </div>
            <div className="explanation">
              That x(X) means that the letter is present in the word X times.
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isSettingsPopupOpen}
        onCloseRequest={() => setIsSettingsPopupOpen(false)}
        showCloseButton={true}
        title="Settings"
      >
        <div className="settingsTable">
          <div className="caseBlock">
            <div>Hard Mode:</div>
            <div className="explanation">
              <ToggleButton disabled={true} />
            </div>
          </div>
          <div className="caseBlock">
            <div>Sound FX:</div>
            <div className="explanation">
              <div
                className="fxControl"
                onClick={() => setIsSoundFxActive(!isSoundFxActive)}
              >
                {isSoundFxActive ? (
                  <FontAwesomeIcon icon={faVolumeHigh} />
                ) : (
                  <FontAwesomeIcon icon={faVolumeXmark} />
                )}
              </div>
            </div>
          </div>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      </Modal>
    </>
  );
}

export default App;
