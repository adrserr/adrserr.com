/* eslint-disable no-param-reassign */
import fs from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'
import readingTime from 'reading-time'
// @ts-ignore
import mdxPrism from 'mdx-prism'
import { Locale } from '../types'

/** Post directory */
const POST_PATH = path.join(process.cwd(), 'data/posts')
/** Locale Post path */
const getLocalePostPath = (locale: Locale, slug: string) =>
  path.join(POST_PATH, locale, `${slug}.mdx`)

/** Get All post file paths and filter by .mdx extension */
export const getPostsPaths = (locale: Locale) =>
  fs
    .readdirSync(path.join(POST_PATH, locale))
    // Only include md(x) files
    .filter((thePath: string) => /\.mdx?$/.test(thePath))
    // Remove .mdx extension
    .map((thePath) => thePath.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug }, locale }))

/** Get post by slug, to get front matter */
export const getPostBySlug = (slug: string, locale: Locale) =>
  fs.readFileSync(getLocalePostPath(locale, slug))

/** Get all posts slugs */
export const getPostsSlugsByLocale = (locale: Locale) =>
  fs
    .readdirSync(`${POST_PATH}/${locale}`)
    .map((slug) => slug.replace(/.mdx/i, ''))

/** Get post summary by slug and locale */
export const getPostSummaryBySlug = (slug: string, locale: Locale) => {
  const fileContent = fs.readFileSync(getLocalePostPath(locale, slug))
  const { content, data } = matter(fileContent)

  if (!data.isPublished) return null

  return {
    slug,
    readingTime: readingTime(content).text.replace('min read', 'min'),
    summary: data.summary as string,
    title: data.title as string,
    publishedAt: data.publishedAt as Date,
    updatedAt: (data.updatedAt as Date) || null,
    locale
  }
}
/** Get all post ordered by locale */
export const getAllPostsSummaryByLocale = (locale: Locale) => {
  const slugs = getPostsSlugsByLocale(locale)

  const posts = slugs.reduce((acc, slug) => {
    const post = getPostSummaryBySlug(slug, locale)
    if (post) acc.push(post)
    return acc
  }, [] as any[])
  // .sort((p1, p2) => (p1.date > p2.date ? -1 : 1))

  return posts
}

/** Get code from mdx source */
export const getMDXCode = async (source: string) => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }
  return bundleMDX(source.toString(), {
    xdmOptions: (options) => {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), mdxPrism]

      return options
    }
  })
}
