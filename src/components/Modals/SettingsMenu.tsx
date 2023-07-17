import { useContext } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import { Modal } from "./Modal";
import { ToggleButton } from "../Buttons/ToggleButton";
import styles from "./SettingsMenu.module.scss";

export const SettingsMenu = () => {
  const { isSettingsMenuOpen, setIsSettingsMenuOpen, restartGame } =
    useContext<IAppContext>(AppContext);

  return (
    <Modal
      isOpen={isSettingsMenuOpen}
      onCloseRequest={() => setIsSettingsMenuOpen(false)}
      showCloseButton={true}
      title="Settings"
    >
      <div className={styles.settingsMenu}>
        <div className={styles["settingsMenu__caseBlock"]}>
          <div>Hard Mode:</div>
          <div className={styles.explanation}>
            <ToggleButton disabled={true} />
          </div>
        </div>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </Modal>
  );
};
