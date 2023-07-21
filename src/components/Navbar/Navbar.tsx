import { useCallback } from "react";
import {
  faCircleQuestion,
  faGear,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppContext, IAppContext } from "../../context/AppContext";
import styles from "./Navbar.module.scss";
import { UserSettings } from "../../providers/GlobalProvider";

export const Navbar = () => {
  const {
    setIsHelpMenuOpen,
    setIsSettingsMenuOpen,
    userSettings,
    setUserSettings,
  } = useContext<IAppContext>(AppContext);

  const handleFxControlClick = useCallback(() => {
    const modifiedUserSettings: UserSettings = {
      ...userSettings,
      isSoundFxActive: !userSettings.isSoundFxActive,
    };
    setUserSettings(modifiedUserSettings);
  }, [userSettings]);

  return (
    <div className={styles.navbar}>
      <div className={styles["navbar__title"]}>
        <span className={styles["navbar__wTitle"]}>〽️</span>
        <span>ordle 2.0</span>
      </div>
      <div className={styles["navbar__actions"]}>
        <div
          data-testid="openHelpMenuButton"
          onClick={() => setIsHelpMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
        <div
          className={styles["settingsMenu__fxControl"]}
          data-testid="soundFxControlButton"
          onClick={handleFxControlClick}
        >
          {userSettings.isSoundFxActive ? (
            <FontAwesomeIcon icon={faVolumeHigh} />
          ) : (
            <FontAwesomeIcon icon={faVolumeXmark} />
          )}
        </div>
        <div
          data-testid="openSettingsMenuButton"
          onClick={() => setIsSettingsMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
