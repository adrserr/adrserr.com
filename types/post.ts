import { Locale } from './locale'

export interface Post {
  slug: string
  readingTime: string
  summary: string
  title: string
  publishedAt: Date
  updatedAt: Date
  locale: Locale
}
