import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { AppContext } from "./context/AppContext";

const MockProvider: React.FC<{
  children: ReactNode | ReactNode[];
  value: object;
}> = ({ children, value }) => (
  <AppContext.Provider value={value}>{children}</AppContext.Provider>
);

export function renderWithContext(element: React.ReactElement, value: object) {
  return render(<MockProvider value={value}>{element}</MockProvider>);
}

export function withContext(element: React.ReactElement, value: object) {
  return <MockProvider value={value}>{element}</MockProvider>;
}
