import * as React from 'react'

type Parsers<T> = {
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

const useLocalStorageState = <T>(
  key: string,
  initialValue: T | (() => T),
  { serialize = JSON.stringify, deserialize = JSON.parse }: Parsers<T> = {}
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = React.useState<T>(() => {
    if (typeof window !== 'undefined') {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
    }
    return initialValue instanceof Function ? initialValue() : initialValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

export { useLocalStorageState }
