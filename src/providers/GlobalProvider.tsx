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
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import { useValidateRealWord } from "../components/hooks/useValidateRealWord";
import { useNotification } from "../components/hooks/useNotification";
interface GlobalProviderProps {
  children: ReactNode | ReactNode[];
}

export interface UserSettings {
  isSoundFxActive: boolean;
  isHardModeActive: boolean;
}

const defaultUserSettings = {
  isSoundFxActive: true,
  isHardModeActive: false,
};
export interface GlobalWordValidation {
  [key: string]: number;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(true);
  const [triesCount, setTriesCount] = useState<number>(defaultTriesCount);
  const [wordLength, setWordLength] = useState<number>(defaultWordLength);
  const [isGridReady, setIsGridReady] = useState<boolean>(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState<boolean>(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState<boolean>(false);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [activeRowIdx, setActiveRowIdx] = useState<number>(0);
  const [randomWord, setRandomWord] = useState<string>("");
  const [globalWordValidation, setGlobalWordValidation] =
    useState<GlobalWordValidation>({});

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000,
      },
    },
  });

  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [userSettings, setUserSettings] = useState<UserSettings>(
    getLocalStorage("userSettings") || defaultUserSettings
  );

  const { generate: generateWord } = useGenerateRandomWord({
    wordLength,
    queryClient,
  });

  const { validate: validateRealWord } = useValidateRealWord({ queryClient });
  const { NotificationInstance, setNotification } = useNotification();

  useEffect(() => {
    setLocalStorage("userSettings", userSettings);
  }, [userSettings]);

  const startGame = async () => {
    setIsMainMenuOpen(false);
    setIsGridReady(true);
    setRandomWord(await generateWord());
  };

  const restartGame = async () => {
    setIsGridReady(false);
    setTriesCount(defaultTriesCount);
    setWordLength(defaultWordLength);
    setIsSettingsMenuOpen(false);
    setIsMainMenuOpen(true);
    setIsEndGame(false);
    setIsWinner(false);
    setActiveRowIdx(0);
    setGlobalWordValidation({});
    setRandomWord(await generateWord());
  };

  const { play: playSound, playlist } = useSoundFx({
    isSoundFxActive: userSettings.isSoundFxActive,
  });

  useEffect(() => {
    if (isEndGame)
      isWinner ? playSound(playlist.Win) : playSound(playlist.Lose);
  }, [isEndGame, isWinner, playSound]);

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
        userSettings,
        setUserSettings,
        validateRealWord,
        setNotification,
        startGame,
        restartGame,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        {NotificationInstance}
      </QueryClientProvider>
    </AppContext.Provider>
  );
};

export default GlobalProvider;
