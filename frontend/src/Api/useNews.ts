import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useNews() {
  const { data, error, isLoading } = useSWR(`v1/news`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    news: data?.data ?? [],
    isLoading,
    isError: error,
  };
}
