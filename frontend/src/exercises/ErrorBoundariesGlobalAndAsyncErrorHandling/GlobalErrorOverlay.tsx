import useGlobalError from "./hooks/useGlobalError";
import "./GlobalErrorOverlay.css";

export const GlobalErrorOverlay = () => {
  const { error, setError } = useGlobalError();

  if (!error) {
    return null;
  }

  const handleDismiss = () => {
    setError(null);
  };

  return (
    <div className="c-global-error">
      <h2>Global Error</h2>
      <p>{error.message}</p>
      <button onClick={handleDismiss} type="button" className="c-global-error__btn">
        Dismiss
      </button>
    </div>
  );
};

export default GlobalErrorOverlay;
