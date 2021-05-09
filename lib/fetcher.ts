import axios, { AxiosResponse } from 'axios'

export const fetcher = <T>(url: string, locale: Locale) =>
  axios.get(url).then((res: AxiosResponse<T>) => res.data)
