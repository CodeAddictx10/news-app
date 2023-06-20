import useSWR from "swr";
import { fetcher } from "./fetcher";

interface ISearchProps {
  query: string;
  category?: string;
  to?: string;
  from?: string;
  ids?: string;
}

export function useSearch(searchProps: ISearchProps) {
  const query = new URLSearchParams(searchProps as any).toString();

  const { data, error, isLoading, mutate } = useSWR(
    "/v1/search?" + query,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    news: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
