import { useState, useRef, useCallback, useEffect } from "react";

export interface IUseSearchWithDebounceProps<T> {
  debounceDelayMs?: number;
  loadingDelayMs?: number;
  searchFn: (query: string, signal?: AbortSignal) => Promise<T[]>;
}

export interface IUseSearchWithDebounceReturn<T> {
  results: T[];
  isLoading: boolean;
  error: string | null;
  performSearch: (query: string) => void;
  clearResults: () => void;
}

// const debounceFunction = (func: <T>(...props: any) => T, delay: number) => {
//   let timerID: number | undefined;
//   return (...props: any) => {
//     if (timerID) {
//       clearTimeout(timerID);
//     }
//     timerID = setTimeout(() => {
//       func(...props);
//     }, delay);
//   };
// };

export const useSearchWithDebounce = <T>({
  searchFn,
  debounceDelayMs = 500,
  loadingDelayMs = 90,
}: IUseSearchWithDebounceProps<T>): IUseSearchWithDebounceReturn<T> => {
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<number | undefined>(undefined);
  const loadingTimerRef = useRef<number | undefined>(undefined);

  const _executeSearch = useCallback(
    async (query: string) => {
      const normalizedQuery = query?.trim().toLowerCase();

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }

      if (!normalizedQuery) {
        setResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      loadingTimerRef.current = setTimeout(() => {
        // Only show loading indicator if request takes longer than X-ms
        setIsLoading(true);
      }, loadingDelayMs);

      setError(null);

      abortControllerRef.current = new AbortController();

      try {
        const data = await searchFn?.(normalizedQuery, abortControllerRef.current.signal);

        setResults(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError((err as Error).message);
          setResults([]);
        }
      } finally {
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
        }
        setIsLoading(false);
      }
    },
    [searchFn, loadingDelayMs]
  );

  const performSearch = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = window.setTimeout(() => {
        _executeSearch(query);
      }, debounceDelayMs);
    },
    [_executeSearch, debounceDelayMs]
  );

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
    setIsLoading(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return { results, isLoading, error, performSearch, clearResults };
};
