import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'
import { RiArrowDropDownLine } from 'react-icons/ri'

export const LanguageSelect = () => {
  const router = useRouter()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none focus:outline-none inline-flex w-30 items-center">
        {router.locale?.toUpperCase() || 'EN'} <RiArrowDropDownLine size="20" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-gray-100 dark:bg-gray-800 w-20 rounded-md p-1 shadow cursor-pointer outline-none">
        <DropdownMenu.Item
          className="rounded-sm px-1 py-1 hover:bg-blue-500 dark:hover:bg-blue-900 hover:text-gray-50 hover:outline-none"
          onSelect={() =>
            router.push(router.asPath, undefined, {
              locale: 'en'
            })
          }
        >
          EN
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="rounded-sm px-1 py-1 hover:bg-blue-500 dark:hover:bg-blue-900 hover:text-gray-50 hover:outline-none"
          onSelect={() =>
            router.push(router.asPath, undefined, {
              locale: 'es'
            })
          }
        >
          ES
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
