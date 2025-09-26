import { useState, type ReactNode } from "react";
import GlobalErrorContext from "./GlobalErrorContext";
import type { IGlobalError } from "./IGlobalError";

export const GlobalErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<IGlobalError | null>(null);

  return (
    <GlobalErrorContext.Provider value={{ error, setError }}>
      {children}
    </GlobalErrorContext.Provider>
  );
};

export default GlobalErrorProvider;
