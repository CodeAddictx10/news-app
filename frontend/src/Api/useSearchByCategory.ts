import useSWR from "swr";
import { fetcher } from "./fetcher";

interface ISearchProps {
  category: string;
}

export function useSearchByCategory({ category }: ISearchProps) {
  const { data, error, isLoading } = useSWR(
    "/v1/search?category=" + category,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    newsByCategory: data?.data,
    isLoading,
    isError: error,
  };
}
