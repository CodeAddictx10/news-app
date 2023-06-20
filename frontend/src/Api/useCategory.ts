import useSWR from 'swr'
import { fetcher } from './fetcher'


export function useCategory () {
  const { data, error, isLoading } = useSWR(`v1/categories`, fetcher, {
    revalidateOnFocus: false,
  })
 
  return {
    categories: data?.data,
    isLoading,
    isError: error
  }
}