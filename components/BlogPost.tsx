import Link from 'next/link'
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import enLocale from 'date-fns/locale/en-US'
import { Locale } from '../types'

interface BlogPostProps {
  slug: string
  readingTime: string
  summary: string
  title: string
  publishedAt: Date
  locale: Locale
}

export const BlogPost = (props: BlogPostProps) => {
  const { title, summary, locale, slug, publishedAt, readingTime } = props
  return (
    <Link href={`/blog/${slug}`} locale={locale}>
      <a className="mb-8 w-full">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
              {title}
            </h4>
            <p className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
              {readingTime} &#8226;{' '}
              {format(new Date(publishedAt), 'MMM yy', {
                locale: locale === 'es' ? esLocale : enLocale
              })}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </a>
    </Link>
  )
}
