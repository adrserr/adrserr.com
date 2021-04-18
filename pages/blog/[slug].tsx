/* eslint-disable global-require */
import matter from 'gray-matter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import { GetStaticPaths } from 'next'
// eslint-disable-next-line import/no-unresolved
import { MdxRemote } from 'next-mdx-remote/types'
// @ts-ignore
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import { Container } from '../../components'
import { getPostBySlug, getPostsPaths, mapPostsPaths } from '../../lib/mdx'
import { Locale } from '../../types'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head
}

interface BlogProps {
  source: MdxRemote.Source
  frontMatter: {
    title: string
    publishedAt: string
    updatedAt?: string
    summary: string
    readingTime: {
      text: string
      time: number
      words: number
      minutes: number
    }
  }
}

export default function Blog({ source, frontMatter }: BlogProps) {
  const content = hydrate(source, { components })
  return (
    <Container
      title={frontMatter.title}
      type="article"
      publishedAt={frontMatter.publishedAt}
      description={frontMatter.summary}
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        {frontMatter.title}
        {content}
      </article>
    </Container>
  )
}

interface Params {
  params: {
    slug: string
  }
  locale: Locale
}

export const getStaticProps = async ({ params, locale = 'en' }: Params) => {
  const source = getPostBySlug(params?.slug || '', locale as Locale)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        // require('remark-autolink-headings'),
        // require('remark-slug'),
        // require('remark-code-titles'),
        // require('remark-rehype')
      ],
      rehypePlugins: [mdxPrism]
      // rehypePlugins: []
    },
    scope: data
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        readingTime: readingTime(content),
        wordCount: content.split(/\s+/gu).length,
        ...data
      },
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const enPosts = mapPostsPaths(getPostsPaths('en'), 'en')
  const esPosts = mapPostsPaths(getPostsPaths('es'), 'es')

  return {
    paths: [...enPosts, ...esPosts],
    fallback: false
  }
}
