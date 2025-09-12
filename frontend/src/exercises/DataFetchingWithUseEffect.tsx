import { useEffect, useState } from "react";
import type { Post } from "../types/Post";
import "./DataFetchingWithUseEffect.css";
/*
Practise:
 * Using useEffect correctly for side effects.

 * Handling async fetch inside useEffect.

 * Managing loading, error, and data states.

 * Rendering UI that adapts to each state.
*/

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

  console.log("FETCHING POSTS");

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Network response was not ok: ${text}`);
  }

  const data = await response.json();

  return data;
}

export const DataFetchingWithUseEffect: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function onFetchPosts() {
    setIsLoading(true);
    setError(null);

    fetchPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    onFetchPosts();
  }, []);

  const hasPosts = !isLoading && !error && posts?.length;

  return (
    <div className="l-posts-container">
      <h2 className="c-posts-header">Posts</h2>

      <div>
        {isLoading && <p className="c-loading-message">Loading posts...</p>}

        {error && (
          <div>
            <p className="c-error-message">{error}</p>
            <button id="retryBtn" onClick={() => onFetchPosts()}>
              Retry
            </button>
          </div>
        )}

        {hasPosts && (
          <>
            <ul className="c-posts-list">
              {posts?.map((post) => {
                return (
                  <li className="c-posts-list__item" key={post.id}>
                    <p>{`User ID: ${post.userId}`}</p>
                    <p>{`title: ${post.title}`}</p>
                    <p>{`body: ${post.body}`}</p>
                  </li>
                );
              })}
            </ul>
            <hr />
            <p>{`Fetched ${posts.length} posts`}</p>
            <hr />
            <div>
              <button id="refetchBtn" onClick={() => onFetchPosts()}>
                Refetch
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataFetchingWithUseEffect;
