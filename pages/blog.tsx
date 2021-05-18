import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlogPost, Container } from '../components'
import { getAllPostsSummaryByLocale } from '../lib/mdx'
import { Locale, Post } from '../types'

interface BlogProps {
  posts: Post[]
}

const Blog = ({ posts }: BlogProps) => {
  const { t } = useTranslation('common')
  const [searchText, setSearchText] = useState('')

  const filteredPosts = posts?.filter((post) =>
    `${post.title?.toLowerCase()}. ${post.summary?.toLowerCase()}`.includes(
      searchText
    )
  )

  return (
    <Container
      title="Blog - Adrián Serrano"
      description={t('blog.description')}
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('blog.summary', {
            articles: posts.length
          })}
        </p>
        <div className="relative w-full mb-8">
          <input
            aria-label={`${t('blog.search')}`}
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={`${t('blog.search')}`}
            className="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!filteredPosts.length && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('blog.notFound')}
          </p>
        )}
        {filteredPosts.length >= 1 &&
          filteredPosts.map((post) => (
            <BlogPost
              key={post.slug}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...post}
              readingTime={`${post.readingTime} ${t('blog.readingTime')}`}
            />
          ))}
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale = 'en' }: { locale: Locale }) => {
  const posts = getAllPostsSummaryByLocale(locale)

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export default Blog
