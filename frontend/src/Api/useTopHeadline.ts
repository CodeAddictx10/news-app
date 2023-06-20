import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useTopHeadline() {
  const { data, error, isLoading } = useSWR(`v1/top-headlines`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    headlines: data?.data ?? [],
    isLoading,
    isError: error,
  };
}
