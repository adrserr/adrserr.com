import { useTheme } from 'next-themes'
import { useRouter } from 'next/dist/client/router'
import { ChangeEvent } from 'react'

export const LanguageSelect = () => {
  const router = useRouter()
  const { theme } = useTheme()

  const backgroundImage =
    theme === 'light'
      ? 'url("/images/chevron-down-light.svg")'
      : 'url("/images/chevron-down-dark.svg")'

  return (
    <select
      className="lang-select appearance-none bg-right bg-no-repeat text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900"
      value={router.locale}
      style={{ backgroundImage }}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        router.push(router.pathname, undefined, {
          locale: event?.target.value
        })
      }}
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
    </select>
  )
}
