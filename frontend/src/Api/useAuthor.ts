import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useAuthor() {
  const { data, error, isLoading } = useSWR(`v1/authors`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    authors: data?.data ?? [],
    isLoading,
    isError: error,
  };
}
