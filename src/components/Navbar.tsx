import "./Navbar.css";
import { faGear, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavbarProps {
  onClickHelp: () => void;
  onClickSettings: () => void;
}

export const Navbar = ({ onClickHelp, onClickSettings }: NavbarProps) => {
  return (
    <div className="navbar">
      <div className="title">
        <span className="wTitle">〽️</span>
        <span>ordle 2.0</span>
      </div>
      <div className="actions">
        <div onClick={onClickHelp}>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
        <div onClick={onClickSettings}>
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
