import { useContext, useCallback } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import { Modal } from "./Modal";
import { ToggleButton } from "../Buttons/ToggleButton";
import styles from "./SettingsMenu.module.scss";

export const SettingsMenu = () => {
  const {
    isSettingsMenuOpen,
    userSettings,
    setUserSettings,
    setIsSettingsMenuOpen,
    restartGame,
  } = useContext<IAppContext>(AppContext);

  const handleOnToggle = useCallback(() => {
    const modifiedUserSettings = {
      ...userSettings,
      isHardModeActive: !userSettings.isHardModeActive,
    };
    setUserSettings(modifiedUserSettings);
  }, [userSettings]);

  return (
    <Modal
      isOpen={isSettingsMenuOpen}
      onCloseRequest={() => setIsSettingsMenuOpen(false)}
      showCloseButton={true}
      title="Settings"
    >
      <div className={styles.settingsMenu} data-testid="settingsMenu">
        <div className={styles["settingsMenu__caseBlock"]}>
          <div>Hard Mode:</div>
          <div className={styles.explanation}>
            <ToggleButton
              value={userSettings.isHardModeActive}
              onToggle={handleOnToggle}
            />
          </div>
        </div>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </Modal>
  );
};
