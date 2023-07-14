import { useState, ReactNode, useEffect } from "react";
import AppContext from "../context/AppContext";
import {
  defaultTriesCount,
  defaultWordLength,
} from "../components/Selectors/constants";
import { useGetRandomWord } from "../components/hooks/useGetRandomWord";

interface GlobalProviderProps {
  children: ReactNode | ReactNode[];
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(true);
  const [triesCount, setTriesCount] = useState(defaultTriesCount);
  const [wordLength, setWordLength] = useState(defaultWordLength);
  const [isGridReady, setIsGridReady] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [isSoundFxActive, setIsSoundFxActive] = useState(true);
  const [isEndGame, setIsEndGame] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [activeRowIdx, setActiveRowIdx] = useState(0);

  const startGame = () => {
    setIsMainMenuOpen(false);
    setIsGridReady(true);
  };

  const restartGame = () => {
    setIsGridReady(false);
    setTriesCount(defaultTriesCount);
    setWordLength(defaultWordLength);
    setIsSettingsMenuOpen(false);
    setIsMainMenuOpen(true);
    setIsEndGame(false);
    setIsWinner(false);
    setActiveRowIdx(0);
  };

  const { randomWord = "" } = useGetRandomWord({ wordLength });

  useEffect(() => {
    if (activeRowIdx === triesCount) setIsEndGame(true);
  }, [activeRowIdx, triesCount]);

  return (
    <AppContext.Provider
      value={{
        isMainMenuOpen,
        setIsMainMenuOpen,
        triesCount,
        setTriesCount,
        wordLength,
        setWordLength,
        isGridReady,
        setIsGridReady,
        isHelpMenuOpen,
        setIsHelpMenuOpen,
        isSettingsMenuOpen,
        setIsSettingsMenuOpen,
        isSoundFxActive,
        setIsSoundFxActive,
        isEndGame,
        setIsEndGame,
        isWinner,
        setIsWinner,
        randomWord,
        activeRowIdx,
        setActiveRowIdx,
        startGame,
        restartGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default GlobalProvider;
