import { useCallback, useEffect, useRef, useState } from "react";
import "./HandlingErrorsInAsyncReactCode.css";
import type { Post } from "../../types/Post";

/*
Practise:
* Catch and handle errors from async operations

* Show a user-friendly error message

* Provide a way to retry failed requests
*/
async function SearchForPosts(searchTerm: string, signal: AbortSignal): Promise<Post[]> {
  console.log("Fetching search results for:", searchTerm);
  try {
    if (signal.aborted) throw new Error("Request has already been aborted");

    // Simulate random error for testing purposes
    if (Math.random() < 0.4) {
      console.count("Simulated random error count");
      throw new Error("Simulated random error");
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&title=${searchTerm}`,
      {
        signal,
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Network response was not ok: ${text}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request aborted");
    }
    const newError = new Error(`Something went wrong\n${err}`);
    console.error(`ERROR FROM HANDLING_ERRORS_IN_ASYNC_REACT_CODE.TSX -> ${newError.message}`);
    throw newError;
  }
}

export const HandlingErrorsInAsyncReactCode: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerID = useRef<number | undefined>(undefined);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const retryFetch = () => {
    performSearch(query);
  };

  const performSearch = useCallback(async (query: string) => {
    const normalizedQuery = query?.trim().toLowerCase();

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!normalizedQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const loadingTimeoutID = setTimeout(() => {
      // Only show loading indicator if request takes longer than Xms
      setIsLoading(true);
    }, 90);

    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const data = await SearchForPosts(normalizedQuery, abortControllerRef.current.signal);

      setResults(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
      setResults([]);
    } finally {
      clearTimeout(loadingTimeoutID);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimerID.current) {
      clearTimeout(debounceTimerID.current);
    }

    setError(null);

    debounceTimerID.current = setTimeout(() => {
      performSearch(query);
    }, 500);

    return () => {
      abortControllerRef.current?.abort();
      clearTimeout(debounceTimerID.current);
    };
  }, [query]);

  return (
    <div className="l-search-container">
      <h2 className="c-search-title">Search With Debounced API Calls</h2>
      <div>
        <input type="text" value={query} onChange={onInputChange} className="c-search-input" />
      </div>
      {isLoading && <p className="c-loading-message">Loading posts...</p>}

      {!isLoading && !error && results.length === 0 && query.length > 0 && (
        <p className="c-no-results-message">No results found</p>
      )}

      {error && (
        <div className="c-error-message">
          <p>{`Error: ${error}`}</p>
          <button onClick={retryFetch} className="c-retry-button">
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <ul>
          {results.map((post) => {
            return (
              <li key={post.id}>
                <p>{`User ID: ${post.userId}`}</p>
                <p>{`title: ${post.title}`}</p>
                <p>{`body: ${post.body}`}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HandlingErrorsInAsyncReactCode;
