import { useState } from "react";

export interface IUseCounterOptions {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export interface IUseCounterReturn {
  value: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

export const useCounter = (options: IUseCounterOptions = {}) => {
  const { initialValue = 0, step = 1, min = -Infinity, max = Infinity } = options;

  const [value, setValue] = useState(initialValue);

  const increment = () => {
    setValue((prevValue) => {
      return Math.min(prevValue + step, max);
    });
  };

  const decrement = () => {
    setValue((prevValue) => {
      return Math.max(prevValue - step, min);
    });
  };

  const reset = () => {
    setValue(initialValue);
  };

  const setValueWithBounds = (value: number) => {
    const newValue = Math.max(min, Math.min(max, value));
    setValue(newValue);
  };

  return { increment, decrement, reset, setValue: setValueWithBounds, value };
};

export default useCounter;
