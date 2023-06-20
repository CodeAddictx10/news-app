import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR(`v1/users`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
