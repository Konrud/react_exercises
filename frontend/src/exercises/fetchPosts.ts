// import type { Post } from "../types/Post";

export async function fetchPosts<T>(userId: string): Promise<T[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts?_limit=5`
  );

  console.log("FETCHING POSTS BY USER ID: ", userId);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Network response was not ok: ${text}`);
  }

  const data = await response.json();

  return data;
}

export default fetchPosts;
