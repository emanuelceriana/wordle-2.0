import { useState, ReactNode } from "react";
import AppContext from "../context/AppContext";

interface GlobalProviderProps {
  children: ReactNode | ReactNode[];
}

export interface IAppContext {
  isSoundFxActive: boolean;
  setIsSoundFxActive: (value: boolean) => void;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isSoundFxActive, setIsSoundFxActive] = useState(true);

  return (
    <AppContext.Provider value={{ isSoundFxActive, setIsSoundFxActive }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalProvider;
