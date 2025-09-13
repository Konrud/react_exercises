import { useCallback, useMemo, useState } from "react";
import ChildComponent from "./ChildComponent";
import ExpensiveCalculationComponent from "./ExpensiveCalculationComponent";

export const PerformanceOptimizationUseMemoUseCallback: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [otherState, setOtherState] = useState<boolean>(false);

  const onIncrementCountClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const onToggleOtherState = useCallback(() => {
    setOtherState((prevOtherState) => !prevOtherState);
  }, []);

  const onChildComponentClick = useCallback(() => {
    console.log(`Child component clicked`);
  }, []);

  const expensiveResult = useMemo(() => {
    console.log(`useMemo recomputing expensive result for ${count}`);

    let result = 0;
    for (let i = 0; i < 1_000_000_000; i++) {
      result += i * count;
    }
    return result;
  }, [count]);

  return (
    <div className="l-performance-optimization-container">
      <h2 className="c-performance-optimization-title">useMemo & useCallback Demo</h2>
      <div>
        <ExpensiveCalculationComponent value={count} />
        <p>Memoised result {expensiveResult}</p>
      </div>
      <div className="l-buttons-container">
        <button onClick={onIncrementCountClick}>Increment count ({count})</button>
        <hr />
        <button onClick={onToggleOtherState}>Toggle other state ({String(otherState)})</button>
      </div>
      <ChildComponent onClick={onChildComponentClick} />
    </div>
  );
};

export default PerformanceOptimizationUseMemoUseCallback;
