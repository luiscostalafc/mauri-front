/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import useSWR from 'swr';
import api from '../services/api';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async () => {
    const response = await api(url);

    return response.data;
  });

  return { data, error, mutate };
}
