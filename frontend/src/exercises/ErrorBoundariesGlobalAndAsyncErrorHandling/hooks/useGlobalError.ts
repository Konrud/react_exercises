import { useContext } from "react";
import GlobalErrorContext from "../GlobalErrorContext";

export const useGlobalError = () => {
  const errorContext = useContext(GlobalErrorContext);

  if (!errorContext) {
    throw new Error("useGlobalError must be used inside GlobalErrorProvider");
  }

  return errorContext;
};

export default useGlobalError;
