import { useCallback, useState } from "react";

const defaultInitialState = {
  status: "idle",
  data: null,
  error: null,
};
export const useFetch = () => {
  const [state, setState] = useState(defaultInitialState);

  const run = useCallback(async (promise) => {
    setState({
      data: null,
      status: "pending",
      error: null,
    });
    const response = await promise;

    const { data, error } = response;

    if (error) {
      setState({
        data: null,
        status: "rejected",
        error,
      });
    }
    if (data) {
      setState({
        data,
        status: "resolved",
        error: null,
      });
    }
  });

  const { data, status, error } = state;

  return {
    data,
    run,
    error,
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
  };
};
