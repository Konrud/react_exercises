export const createResource = <T>(promise: Promise<T>) => {
  let status = "pending";

  let result: T;

  const suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;

      return result;
    },
  };
};
