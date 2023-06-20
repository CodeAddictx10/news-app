import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useNewsFeed() {
  const { data, error, isLoading } = useSWR(`v1/personalized-feeds`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    newsFeeds: data?.data ?? [],
    isLoading,
    isError: error,
  };
}
