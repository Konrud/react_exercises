import { useState, useRef, useEffect } from "react";
import type { Post } from "../types/Post";
import fetchPosts from "./fetchPosts";

export function usePosts({ initUserId }: { initUserId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const debounceTimerID = useRef<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function onFetchPosts(userId: string) {
    if (!userId) {
      return;
    }

    if (debounceTimerID.current) {
      console.log("Clearing timer: ", debounceTimerID.current);
      clearTimeout(debounceTimerID.current);
    }

    debounceTimerID.current = setTimeout(() => {
      setIsLoading(true);
      setError(null);

      fetchPosts<Post>(userId)
        .then((data) => {
          setPosts(data);
        })
        .catch((err) => {
          setError(err.message || "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });

      console.log("Updated userId to: ", userId);
      clearTimeout(debounceTimerID.current!);
      debounceTimerID.current = undefined;
      console.log("Cleared timer: ", debounceTimerID.current);
    }, 300);

    console.log("Setting timer: ", debounceTimerID.current);
  }

  useEffect(() => {
    if (!initUserId?.trim()) return;

    onFetchPosts(initUserId);
  }, [initUserId]);

  return { posts, isLoading, error, onFetchPosts };
}

export default usePosts;
