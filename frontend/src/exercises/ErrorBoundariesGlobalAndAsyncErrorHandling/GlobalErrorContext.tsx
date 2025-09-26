import { createContext } from "react";
import type { IGlobalError } from "./IGlobalError";

export type GlobalErrorContextType = {
  error: IGlobalError | null;
  setError: (err: IGlobalError | null) => void;
};

// Could be enhanced with
/*
    interface GlobalErrorContextType {
        errors: GlobalError[];
        addError: (error: Omit<GlobalError, 'id' | 'timestamp'>) => void;
        removeError: (id: string) => void;
        clearAllErrors: () => void;
    }
*/

const GlobalErrorContext = createContext<GlobalErrorContextType | undefined>(undefined);

export default GlobalErrorContext;
