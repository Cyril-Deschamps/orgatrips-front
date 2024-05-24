import { QueryClient } from "@tanstack/react-query";

export const baseURL = process.env.REACT_APP_API_HOST;
export const hostBaseURL = process.env.REACT_APP_HOST;

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: STALE_TIME,
    },
  },
};

export const getQueryClient = () => new QueryClient(queryClientConfig);
