import { useState } from "react";
// import type { Post } from "../types/Post";
import "./DataFetchingWithUseEffect.css";
import usePosts from "./usePosts";
/*
Practise:
* Understanding when to include variables in the dependency array.

* Recognising what causes infinite re-renders.

* Refactoring effects so they depend on the right things.
*/

export const UseEffectDependenciesAndInfiniteLoop: React.FC = () => {
  const [userId, setUserId] = useState<string>("1");
  const { posts, isLoading, error, onFetchPosts } = usePosts({ initUserId: "1" });

  function onUserIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserId(e.target.value);
    onFetchPosts(e.target.value);
  }

  const hasPosts = !isLoading && !error && posts?.length;

  return (
    <div className="l-posts-container">
      <div className="l-user-input-container">
        <label htmlFor="userId">User ID:</label>
        <input type="text" id="userId" value={userId} onChange={onUserIdChange} />
      </div>

      <h2 className="c-posts-header">Posts</h2>

      <div>
        {isLoading && <p className="c-loading-message">Loading posts...</p>}

        {error && (
          <div>
            <p className="c-error-message">{error}</p>
            <button id="retryBtn" onClick={() => onFetchPosts(userId)}>
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
              <button id="refetchBtn" onClick={() => onFetchPosts(userId)}>
                Refetch
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UseEffectDependenciesAndInfiniteLoop;
