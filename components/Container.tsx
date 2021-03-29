import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
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

  React.useEffect(() => setMounted(true), [])

  //https://github.com/pacocoursey/next-themes#usetheme
  if (!mounted) return null

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{title}</title>
      </Head>
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-gray-50 dark:bg-gray-900 bg-opacity-60">
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <button
          className="h-10 w-10 p-3 bg-gray-200 dark:bg-gray-700 rounded-md"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {theme === 'light' ? (
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              ) : (
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              )}
            </svg>
          )}
        </button>
        <div>
          <Link href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
          </Link>
          <Link href="/about">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">About</a>
          </Link>
          <Link href="/cv">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">CV</a>
          </Link>
        </div>
      </nav>
      <main
        id="skip"
        className="flex flex-col flex-container  mt-auto justify-center bg-gray-50 dark:bg-gray-900 px-8"
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
