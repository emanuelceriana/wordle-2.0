import { memo, useContext } from "react";
import { AppContext, IAppContext } from "../../context/AppContext";
import { RangeSlider } from "../Selectors/RangeSlider";
import { WordLengthSelector } from "../Selectors/WordLengthSelector";
import { defaultTriesCount, defaultWordLength } from "../Selectors/constants";
import styles from "./MainMenu.module.scss";
import { Modal } from "./Modal";
import { mainMenuText } from "./constants";

export const MainMenu = memo(() => {
  const { isMainMenuOpen, setWordLength, setTriesCount, startGame } =
    useContext<IAppContext>(AppContext);

  return (
    <Modal isOpen={isMainMenuOpen} showCloseButton={false}>
      <div className={styles.mainMenu}>
        <h3>Welcome to Wordle 2.0</h3>
        <p>{mainMenuText}</p>

        <WordLengthSelector
          defaultValue={defaultWordLength}
          onClickRequest={setWordLength}
        />
        <RangeSlider
          defaultValue={defaultTriesCount}
          onChangeRequest={setTriesCount}
        />
        <div>
          <button onClick={startGame}>Start Game</button>
        </div>
      </div>
    </Modal>
  );
});
