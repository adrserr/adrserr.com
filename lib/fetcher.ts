import axios, { AxiosResponse } from 'axios'

export const fetcher = <T>(url: string) =>
  axios.get(url).then((res: AxiosResponse<T>) => res.data)
