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

  const {
    data: hints,
    error,
    refetch,
    isLoading,
  }: UseQueryResult<SimplifiedHint[], Error> = useQuery(
    ["hints", randomWord],
    () => fetchHints(randomWord),
    { enabled: false }
  );

  const handleHints = useCallback(() => {
    refetch();
    !isLoading && playSound(playlist.Reveal);
    setShowHints(true);
  }, [hints, indexHint, isLoading, playSound]);

  const showLeftButton = useMemo(() => {
    return indexHint !== 0;
  }, [hints, indexHint]);

  const showRigthButton = useMemo(() => {
    return hints && hints.length && indexHint < hints.length - 1;
  }, [hints, indexHint]);

  const handleArrowClick = useCallback(
    (number: number) => {
      playSound(playlist.Click);
      setIndexHint((index: number) => index + number);
    },
    [playSound]
  );

  return (
    <div className={styles.hintBox}>
      {showHints && !isLoading ? (
        error || (!hints?.length && !isLoading) ? (
          <div className={styles.error}>
            Ups... you shouldn't be seeing this! 😳
          </div>
        ) : (
          <>
            <div
              data-testid="previousHint"
              className={cn(styles.left, {
                [styles.hidden]: !showLeftButton,
              })}
              onClick={() => handleArrowClick(-1)}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
            <div data-testid="hintText" className={styles.hintText}>
              <div className={styles.lexicalCategory}>
                <b>{hints?.[indexHint].lexicalCategory}:</b>
              </div>
              <div className={styles.definition}>
                <i>{hints?.[indexHint].shortDefinitions}</i>
              </div>
            </div>

            <div
              data-testid="nextHint"
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
          {isLoading ? (
            <div>Searching hints... 🕵</div>
          ) : (
            <>
              <button data-testid="hintButton" onClick={handleHints}>
                Hint
              </button>
              <div>
                <b>Note:</b>{" "}
                <i>
                  Some hints make the game 99% simpler so think twice before
                  clicking 🤔
                </i>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
