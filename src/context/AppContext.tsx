import { createContext, ReactNode } from "react";
import { PlaylistValidKeys } from "../components/hooks/useSoundFx";
import { ValidationArray } from "../utils";
import {
  GlobalWordValidation,
  UserSettings,
} from "../providers/GlobalProvider";

export interface IAppContext {
  isMainMenuOpen: boolean;
  setIsMainMenuOpen: (x: boolean) => void;
  triesCount: number;
  setTriesCount: (x: number) => void;
  wordLength: number;
  setWordLength: (x: number) => void;
  isGridReady: boolean;
  setIsGridReady: (x: boolean) => void;
  isHelpMenuOpen: boolean;
  setIsHelpMenuOpen: (x: boolean) => void;
  isSettingsMenuOpen: boolean;
  setIsSettingsMenuOpen: (x: boolean) => void;
  playSound: (sound: PlaylistValidKeys) => void;
  playlist: typeof PlaylistValidKeys;
  isEndGame: boolean;
  setIsEndGame: (x: boolean) => void;
  isWinner: boolean;
  setIsWinner: (x: boolean) => void;
  randomWord: string;
  activeRowIdx: number;
  setActiveRowIdx: (x: number) => void;
  globalWordValidation: GlobalWordValidation;
  handleGlobalWordValidation: (x: ValidationArray[]) => void;
  userSettings: UserSettings;
  setUserSettings: (x: UserSettings) => void;
  validateRealWord: (x: string) => Promise<boolean>;
  setNotification: (x: ReactNode) => void;
  startGame: () => void;
  restartGame: () => void;
}

export const AppContext: any = createContext<any>({});

export default AppContext;
