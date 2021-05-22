import { useTheme } from 'next-themes'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Locale } from '../types'
import { Footer } from './Footer'
import { LanguageSelect } from './LanguageSelect'

interface ContainerProps {
  children: JSX.Element | string
  title?: string
  description?: string
  publishedAt?: string
  type?: 'article' | 'website'
  image?: string
}

export function Container(props: ContainerProps) {
  const {
    children,
    title = 'Adrián Serrano - Front-End Developer',
    description = 'Front-End Developer, Typescript Ninja',
    publishedAt,
    image = 'https://adrserr.com/images/logo.svg',
    type = 'website'
  } = props

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { t } = useTranslation('common')

  // https://github.com/pacocoursey/next-themes#usetheme
  useEffect(() => setMounted(true), [])

  const locale = router.locale === 'es' ? '/es' : ''
  const canonical = `https://adrserr.com${locale}${router.asPath}`

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name="robots" content="follow,index" />

        {/* RSS feed autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Adrián Serrano Blog"
          href={`${locale}/rss.xml`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonical} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />

        {/* <meta property="og:url" content={canonical} key="ogurl" />
        <meta property="og:type" content={type} />
        <meta
          property="og:site_name"
          content="Adrián Serrano"
          key="ogsitename"
        />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:image" content={image} key="ogimage" /> */}
        <meta property="og:locale" content={router.locale} />
        {router?.locales?.map((loc) =>
          loc !== router.locale ? (
            <meta
              property="og:locale:alternate"
              content={loc}
              key={`og:locale:${loc}`}
            />
          ) : (
            ''
          )
        )}
        {/* Twitter open grahp */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="adrserr.com" />
        <meta property="twitter:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} /> */}
        <meta name="twitter:creator" content="@adrserr10" />
        <meta name="twitter:site" content="@adrserr10" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        {publishedAt && (
          <meta property="article:published_time" content={publishedAt} />
        )}
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://adrserr.com${router.asPath}`}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={`https://adrserr.com/es${router.asPath}`}
        />
        <link rel="alternate" hrefLang="x-default" href="https://adrserr.com" />
      </Head>
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-2 md:my-8 mx-auto bg-gray-50 dark:bg-gray-900 bg-opacity-60">
        <a href="#skip" className="sr-only focus:not-sr-only">
          {t('header.skipToContent')}
        </a>
        <div className="flex">
          <button
            type="button"
            aria-label="Theme"
            className="h-10 w-10 p-3 bg-gray-200 dark:bg-gray-700 rounded-md mr-3"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light')
            }}
            disabled={!mounted}
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
        </div>
        <div className="flex items-center">
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
          <Link href="/">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              {t('header.home')}
            </a>
          </Link>
          <div className="p-1 sm:p-4">
            <LanguageSelect />
          </div>
        </div>
      </nav>
      <main
        id="skip"
        className="flex flex-col flex-container mt-auto bg-gray-50 dark:bg-gray-900 px-8"
      >
        {children}
      </main>
      <Footer locale={(router.locale || 'en') as Locale} />
    </>
  )
}
