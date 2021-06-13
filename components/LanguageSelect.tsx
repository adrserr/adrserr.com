import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useEffect } from 'react'
import { useLocalStorageState } from '../hooks'
import { Locale } from '../types'

export const LanguageSelect = () => {
  const { push, locale, asPath } = useRouter()

  const [preferredLanguage, setLanguage] = useLocalStorageState<Locale>(
    'preferredLanguage',
    (locale || 'en') as Locale
  )

  useEffect(() => {
    if (preferredLanguage && preferredLanguage !== locale) {
      push(asPath, undefined, {
        locale: preferredLanguage
      })
    }
  }, [asPath, locale, preferredLanguage, push])

  return (
    <DropdownMenu.Root key="lang-select">
      <DropdownMenu.Trigger className="outline-none focus:outline-none inline-flex w-30 items-center">
        {locale?.toUpperCase() || 'EN'} <RiArrowDropDownLine size="20" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop
        className="bg-gray-100 dark:bg-gray-800 w-20 rounded-md p-1 shadow cursor-pointer outline-none"
      >
        <DropdownMenu.Item
          className="rounded-sm px-1 py-1 hover:bg-blue-500 dark:hover:bg-blue-900 hover:text-gray-50 hover:outline-none"
          onSelect={() => {
            setLanguage('en')
            push(asPath, undefined, {
              locale: 'en'
            })
          }}
        >
          EN
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="rounded-sm px-1 py-1 hover:bg-blue-500 dark:hover:bg-blue-900 hover:text-gray-50 hover:outline-none"
          onSelect={() => {
            setLanguage('es')
            push(asPath, undefined, {
              locale: 'es'
            })
          }}
        >
          ES
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
