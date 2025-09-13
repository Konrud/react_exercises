export const fetchUsers = async (delayInSeconds?: number) => {
  console.log("Fetching users...");
  try {
    if (delayInSeconds) {
      await new Promise((resolve) => setTimeout(resolve, delayInSeconds * 1000));
    }

    const response = await fetch("https://randomuser.me/api/?results=3");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    if (!data.results) {
      throw new Error("No results found!");
    }

    const users = data.results.map(
      (user: { name: { first: string; last: string }; email: string }) => {
        return {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
        };
      }
    );

    return users;
  } catch (error) {
    console.error(`error: ${error}`);
    throw error;
  }
};

export default fetchUsers;
