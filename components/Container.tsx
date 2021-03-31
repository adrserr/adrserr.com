import * as React from 'react'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { Footer } from './Footer'

type Metadata = {
  title: string
}
interface ContainerProps {
  children: JSX.Element | string
  title: string
}

export function Container(props: ContainerProps) {
  const { children, title } = props

  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { push, pathname, locale, locales } = useRouter()
  const { t } = useTranslation('common')

  React.useEffect(() => setMounted(true), [])

  // https://github.com/pacocoursey/next-themes#usetheme
  if (!mounted) return null

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{title}</title>
      </Head>
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-gray-50 dark:bg-gray-900 bg-opacity-60">
        <a href="#skip" className="sr-only focus:not-sr-only">
          {t('header.skipToContent')}
        </a>
        <div className="flex">
          <button
            type="button"
            className="h-10 w-10 p-3 bg-gray-200 dark:bg-gray-700 rounded-md mr-3"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {theme === 'light' ? (
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            )}
          </button>
          {locale && locales && (
            <button
              type="button"
              className="h-10 w-10 p-3 bg-gray-200 dark:bg-gray-700 rounded-md"
              onClick={() => {
                push(pathname, undefined, {
                  locale:
                    locales?.indexOf(locale) === 0 ? locales[1] : locales[0]
                })
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        <div>
          <Link href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              {t('header.blog')}
            </a>
          </Link>
          <Link href="/about">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              {t('header.about')}
            </a>
          </Link>
          <Link href="/cv">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              {t('header.cv')}
            </a>
          </Link>
        </div>
      </nav>
      <main
        id="skip"
        className="flex flex-col flex-container mt-auto bg-gray-50 dark:bg-gray-900 px-8"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
