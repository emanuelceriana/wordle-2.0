import { useContext, ReactNode } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import { Modal } from "./Modal";
import styles from "./HelpMenu.module.scss";

interface SimpleExplanationProps {
  children: ReactNode;
}

const SimpleExplanation = ({ children }: SimpleExplanationProps) => {
  return <div className={styles["helpMenu__explanation"]}>{children}</div>;
};

interface LetterExplanationProps {
  children: ReactNode;
  color?: "green" | "yellow" | "black";
  letter: string;
  hasOcurrences?: boolean;
  ocurrences?: number;
}

const LetterExplanation = ({
  children,
  color,
  letter,
  hasOcurrences = false,
  ocurrences,
}: LetterExplanationProps) => {
  return (
    <div className={styles["helpMenu__caseBlock"]}>
      {hasOcurrences ? (
        <div>
          <span>x{ocurrences}</span>
          {letter}
        </div>
      ) : (
        <div className={styles[`helpMenu__caseBlock-${color}`]}>{letter}</div>
      )}
      <div className={styles["helpMenu__caseBlock-explanation"]}>
        {children}
      </div>
    </div>
  );
};

export const HelpMenu = () => {
  const { isHelpMenuOpen, setIsHelpMenuOpen } =
    useContext<IAppContext>(AppContext);

  return (
    <Modal
      isOpen={isHelpMenuOpen}
      onCloseRequest={() => setIsHelpMenuOpen(false)}
      showCloseButton={true}
      title="Help"
    >
      <div className={styles.helpMenu}>
        <SimpleExplanation>
          To start playing you need just to write a word with the length of the
          squares availables, you can use the virtual keyboard if you want.
        </SimpleExplanation>
        <SimpleExplanation>
          <b>Easy Mode:</b> For each try you don't need to write word. A chain
          of characters is valid. It's easy and boring. 🥱 <i>ASDASD</i> should
          work.
        </SimpleExplanation>
        <SimpleExplanation>
          <b>Hard Mode:</b> For each try you need to write a real word. It's
          harder and exciting. 🔥 Did you know that <i>QWERTY</i> is accepted by
          Merriam-Webster dictionary?
        </SimpleExplanation>
        <LetterExplanation color="green" letter="W">
          If green it means that the word has this letter and it is in the
          correct position.
        </LetterExplanation>
        <LetterExplanation color="yellow" letter="O">
          If yellow it means that the word has this letter but it is not in the
          correct position.
        </LetterExplanation>
        <LetterExplanation color="black" letter="R">
          If black it means that the word has not this letter.
        </LetterExplanation>
        <LetterExplanation hasOcurrences={true} ocurrences={2} letter="D">
          That x(X) means that the letter is present in the word X times.
        </LetterExplanation>
      </div>
    </Modal>
  );
};

export default HelpMenu;
