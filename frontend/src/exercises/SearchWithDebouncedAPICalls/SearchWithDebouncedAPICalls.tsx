import { useEffect, useRef, useState } from "react";
import "./SearchWithDebouncedAPICalls.css";
import type { Post } from "../../types/Post";

/*
Practise:
* Implement debouncing with useEffect + setTimeout

* Fetch results only after the user stops typing

* Handle loading state and show results

* Optimise by memoising callbacks to prevent unnecessary re-renders
*/
async function SearchForPosts(searchTerm: string, signal: AbortSignal): Promise<Post[]> {
  console.log("Fetching search results for:", searchTerm);
  try {
    if (signal.aborted) throw new Error("Request has already been aborted");

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
    console.error(`ERROR FROM SEARCH_WITH_DEBOUNCED_API_CALLS.TSX -> ${newError.message}`);
    throw newError;
  }
}

export const SearchWithDebouncedAPICalls: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerID = useRef<number | undefined>(undefined);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debounceTimerID.current) {
      clearTimeout(debounceTimerID.current);
    }

    if (query.length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    debounceTimerID.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      SearchForPosts(query, abortControllerRef.current.signal)
        .then((data) => {
          setResults(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
      {!isLoading && results.length === 0 && query.length > 0 && (
        <p className="c-no-results-message">No results found</p>
      )}
      {!isLoading && results.length > 0 && (
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

export default SearchWithDebouncedAPICalls;
