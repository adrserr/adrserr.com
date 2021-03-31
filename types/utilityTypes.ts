// i18n mapped type to get only finak keys that return an string
export type AppendKeys<K1, K2> = `${K1 & string}.${K2 & string}`

export type Normalize<T, K = keyof T> = K extends keyof T
  ? T[K] extends Record<string, any>
    ? AppendKeys<K, Normalize<T[K]>>
    : K
  : never

export type OnlyStringKeys<T> = Record<Normalize<T>, string>
