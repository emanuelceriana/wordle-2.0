import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  defaultTriesCount,
  defaultWordLength,
} from "../components/Selectors/constants";
import { useGenerateRandomWord } from "../components/hooks/useGenerateRandomWord";
import { useSoundFx } from "../components/hooks/useSoundFx";
import AppContext from "../context/AppContext";
import { ValidationArray } from "../utils";
import { QueryClient, QueryClientProvider } from "react-query";
interface GlobalProviderProps {
  children: ReactNode | ReactNode[];
}
export interface GlobalWordValidation {
  [key: string]: number;
}

const queryClient = new QueryClient();

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(true);
  const [triesCount, setTriesCount] = useState<number>(defaultTriesCount);
  const [wordLength, setWordLength] = useState<number>(defaultWordLength);
  const [isGridReady, setIsGridReady] = useState<boolean>(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState<boolean>(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState<boolean>(false);
  const [isSoundFxActive, setIsSoundFxActive] = useState<boolean>(true);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [activeRowIdx, setActiveRowIdx] = useState<number>(0);
  const [randomWord, setRandomWord] = useState<string>("");
  const [globalWordValidation, setGlobalWordValidation] =
    useState<GlobalWordValidation>({});

  const { generate: generateWord } = useGenerateRandomWord({ wordLength });

  const startGame = () => {
    setIsMainMenuOpen(false);
    setIsGridReady(true);
    setRandomWord(generateWord());
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
    setGlobalWordValidation({});
    setRandomWord(generateWord());
  };

  const { play: playSound, playlist } = useSoundFx({ isSoundFxActive });

  useEffect(() => {
    if (isEndGame)
      isWinner ? playSound(playlist.Win) : playSound(playlist.Lose);
  }, [isEndGame, isWinner]);

  useEffect(() => {
    if (activeRowIdx === triesCount) setIsEndGame(true);
  }, [activeRowIdx, triesCount]);

  const handleGlobalWordValidation = useCallback(
    (arrayValidation: ValidationArray[]) => {
      const globalArrayValidation: GlobalWordValidation = {
        ...globalWordValidation,
      };

      arrayValidation.map(({ value, letter }) => {
        globalArrayValidation[letter] = value;
      });

      setGlobalWordValidation(globalArrayValidation);
    },
    [globalWordValidation]
  );

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
        playSound,
        playlist,
        isEndGame,
        setIsEndGame,
        isWinner,
        setIsWinner,
        randomWord,
        activeRowIdx,
        setActiveRowIdx,
        globalWordValidation,
        handleGlobalWordValidation,
        startGame,
        restartGame,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
};

export default GlobalProvider;
