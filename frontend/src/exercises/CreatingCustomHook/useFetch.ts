import { useEffect, useRef, useCallback, useState } from "react";

export interface IUseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string | FormData | null;
  enabled?: boolean;
}

export interface IUseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetch = <T>(
  url: string,
  options: IUseFetchOptions = {}
): IUseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { method = "GET", headers, body, enabled = true } = options;

  const fetchData = useCallback(async () => {
    if (!enabled || !url) return;

    try {
      // Abort any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for the current request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: method !== "GET" ? body : undefined,
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!signal.aborted) {
        setData(data);
      }
    } catch (error) {
      // Don't set error state for aborted request
      if (error instanceof Error && error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [enabled, url, method, headers, body]);

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
