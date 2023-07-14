import { useContext, useState, useCallback, useMemo } from "react";
import { IAppContext, AppContext } from "../../context/AppContext";
import { useQuery, UseQueryResult } from "react-query";
import { fetchHints, SimplifiedHint } from "../../api";
import styles from "./Hints.module.scss";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cn from "classnames";

export const Hints = () => {
  const [indexHint, setIndexHint] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const { randomWord, playSound, playlist } =
    useContext<IAppContext>(AppContext);

  const { data: hints, error }: UseQueryResult<SimplifiedHint[], Error> =
    useQuery(["hints", randomWord], () => fetchHints(randomWord));

  const handleHints = useCallback(() => {
    playSound(playlist.Reveal);
    setShowHints(true);
  }, [hints, indexHint]);

  const showLeftButton = useMemo(() => {
    return indexHint !== 0;
  }, [hints, indexHint]);

  const showRigthButton = useMemo(() => {
    return hints && hints.length && indexHint < hints.length - 1;
  }, [hints, indexHint]);

  const handleArrowClick = (number: number) => {
    playSound(playlist.Click);
    setIndexHint((index: number) => index + number);
  };

  return (
    <div className={styles.hintBox}>
      {showHints ? (
        error || !hints?.length ? (
          <div className={styles.error}>
            Ups... you shouldn't be seeing this! 😳
          </div>
        ) : (
          <>
            <div
              className={cn(styles.left, {
                [styles.hidden]: !showLeftButton,
              })}
              onClick={() => handleArrowClick(-1)}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
            <div className={styles.hintText}>
              <div className={styles.lexicalCategory}>
                <b>{hints?.[indexHint].lexicalCategory}:</b>
              </div>
              <div className={styles.definition}>
                <i>{hints?.[indexHint].shortDefinitions}</i>
              </div>
            </div>

            <div
              className={cn(styles.right, {
                [styles.hidden]: !showRigthButton,
              })}
              onClick={() => handleArrowClick(1)}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </>
        )
      ) : (
        <div className={styles.hidingHint}>
          <button onClick={handleHints}>Hint</button>
          <div>
            <b>Note:</b>{" "}
            <i>
              Some hints make the game 99% simple so think twice before clicking
              🤔
            </i>
          </div>
        </div>
      )}
    </div>
  );
};
