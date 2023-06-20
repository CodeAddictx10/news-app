import useSWR from "swr";
import { fetcher } from "./fetcher";

export function useSource() {
  const { data, error, isLoading } = useSWR(`v1/sources`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    sources: data?.data,
    isLoading,
    isError: error,
  };
}
