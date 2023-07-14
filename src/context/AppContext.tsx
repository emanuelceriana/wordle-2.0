import { createContext } from "react";

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
  isSoundFxActive: boolean;
  setIsSoundFxActive: (value: boolean) => void;
  isEndGame: boolean;
  setIsEndGame: (x: boolean) => void;
  isWinner: boolean;
  setIsWinner: (x: boolean) => void;
  randomWord: string;
  activeRowIdx: number;
  setActiveRowIdx: (x: number) => void;
  startGame: () => void;
  restartGame: () => void;
}

export const AppContext: any = createContext<any>({});

export default AppContext;
