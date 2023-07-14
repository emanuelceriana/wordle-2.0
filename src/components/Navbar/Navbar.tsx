import { faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppContext, IAppContext } from "../../context/AppContext";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { setIsHelpMenuOpen, setIsSettingsMenuOpen } =
    useContext<IAppContext>(AppContext);

  return (
    <div className={styles.navbar}>
      <div className={styles["navbar__title"]}>
        <span className={styles["navbar__wTitle"]}>〽️</span>
        <span>ordle 2.0</span>
      </div>
      <div className={styles["navbar__actions"]}>
        <div onClick={() => setIsHelpMenuOpen(true)}>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
        <div onClick={() => setIsSettingsMenuOpen(true)}>
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
