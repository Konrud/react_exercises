import "./CreatingCustomHook.css";
import useCounter from "./useCounter";
import useFetch from "./useFetch";
import type { Post } from "../../types/Post";

/*
Practise:
* Extracting reusable logic from a component into a custom hook.

* Keeping state + effects encapsulated inside the hook.

* Using the hook in multiple components.
*/

export const CreatingCustomHook: React.FC = () => {
  const { value, increment, decrement, reset } = useCounter({ initialValue: 5 });
  const { data, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  if (!data) return null;

  return (
    <div className="l-creating-custom-hook-container">
      <h2 className="c-creating-custom-hook-title">Creating Custom Hook</h2>
      <div className="l-fetch-container">
        <button>Fetch Posts</button>

        {error && <p>{error}</p>}

        {loading && !error && <p>Loading...</p>}

        {!error && !loading && data.length > 0 && (
          <ul>
            {data?.map((post) => {
              return (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="l-counter-container">
        <div className="l-counter-container__btns-container">
          <button className="c-counter-container__btn" onClick={increment}>
            Increment
          </button>
          <button className="c-counter-container__btn" onClick={decrement}>
            Decrement
          </button>
          <button className="c-counter-container__btn" onClick={reset}>
            Reset
          </button>
          <output className="c-counter-container__output">{`Counter: ${value}`}</output>
        </div>
      </div>
    </div>
  );
};

export default CreatingCustomHook;
