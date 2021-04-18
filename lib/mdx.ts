import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { Locale } from '../types'

/** Post directory */
const POST_PATH = path.join(process.cwd(), 'data/posts')

/** Get All post file paths and filter by .mdx extension */
export const getPostsPaths = (locale: Locale) =>
  fs
    .readdirSync(path.join(POST_PATH, locale))
    // Only include md(x) files
    .filter((thePath: string) => /\.mdx?$/.test(thePath))

/** Map paths array by locale */
export const mapPostsPaths = (paths: string[], locale: Locale) =>
  paths
    .map((thePath) => thePath.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug }, locale }))

/** Get post by slug, to get front matter */
export const getPostBySlug = (slug: string, locale: Locale) =>
  fs.readFileSync(path.join(POST_PATH, locale, `${slug}.mdx`))

/** Get all posts slugs */
export const getPostsSlugsByLocale = (locale: Locale) =>
  fs
    .readdirSync(`${POST_PATH}/${locale}`)
    .map((slug) => slug.replace(/.mdx/i, ''))

/** Get post summary by slug and locale */
export const getPostSummaryBySlug = (slug: string, locale: Locale) => {
  const fileContent = fs.readFileSync(
    path.join(POST_PATH, locale, `${slug}.mdx`)
  )
  const { content, data } = matter(fileContent)

  return {
    slug,
    readingTime: readingTime(content).text.replace('min read', 'min'),
    summary: data.summary as string,
    title: data.title as string,
    publishedAt: data.publishedAt as Date,
    updatedAt: data.updatedAt as Date,
    locale
  }
}
/** Get all post ordered by locale */
export const getAllPostsSummaryByLocale = (locale: Locale) => {
  const slugs = getPostsSlugsByLocale(locale)

  const posts = slugs.map((slug) => getPostSummaryBySlug(slug, locale))
  // .sort((p1, p2) => (p1.date > p2.date ? -1 : 1))

  return posts
}
