import { useContext } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import { Modal } from "./Modal";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton } from "../Buttons/ToggleButton";
import styles from "./SettingsMenu.module.scss";

export const SettingsMenu = () => {
  const {
    isSettingsMenuOpen,
    setIsSettingsMenuOpen,
    isSoundFxActive,
    setIsSoundFxActive,
    restartGame,
  } = useContext<IAppContext>(AppContext);

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
        <div className={styles["settingsMenu__caseBlock"]}>
          <div>Sound FX:</div>
          <div className={styles.explanation}>
            <div
              className={styles["settingsMenu__fxControl"]}
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
  );
};
