import { useEffect } from "react";
import useGlobalError from "./hooks/useGlobalError";
import { GLOBAL_ERROR } from "./IGlobalError";

export const BuggyAsyncComponent: React.FC = () => {
  const { setError } = useGlobalError();

  useEffect(() => {
    const timerID = setTimeout(() => {
      setError({
        id: "1",
        timestamp: new Date(),
        type: GLOBAL_ERROR.NETWORK,
        message: "BuggyAsyncComponent: => Failed to fetch data from server",
      });
    }, 1.5 * 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [setError]);

  return (
    <div style={{ border: "2px solid", borderRadius: "3px", padding: "10px 20px" }}>
      <h2>Buggy Async Component</h2>
      <p>Loading Async data...</p>
    </div>
  );
};

export default BuggyAsyncComponent;
