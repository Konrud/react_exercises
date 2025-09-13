export const createResourceWithAbort = <T>(promise: (signal: AbortSignal) => Promise<T>) => {
  let status = "pending";

  let result: T;

  const abortController = new AbortController();
  const signal = abortController.signal;

  const suspender = promise(signal).then(
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
    abort() {
      abortController.abort();
    },
  };
};
