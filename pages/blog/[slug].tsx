import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
// @ts-ignore
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'
import React from 'react'
import { Container } from '../../components'
import { getPostBySlug, getPostsPaths } from '../../lib/mdx'
import { Locale } from '../../types'

interface BlogProps {
  code: string
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

export default function Blog({ code, frontMatter }: BlogProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Container
      title={frontMatter.title}
      type="article"
      publishedAt={frontMatter.publishedAt}
      description={frontMatter.summary}
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          {frontMatter.title}
        </h1>
        <div className="prose dark:prose-dark max-w-none w-full">
          <Component />
        </div>
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

  const { code, frontmatter } = await bundleMDX(source.toString(), {
    xdmOptions(input, options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      // eslint-disable-next-line no-param-reassign
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
      // eslint-disable-next-line no-param-reassign
      options.rehypePlugins = [...(options.rehypePlugins ?? []), mdxPrism]

      return options
    }
  })

  return {
    props: {
      code,
      frontMatter: {
        readingTime: readingTime(Buffer.toString()),
        wordCount: code.split(/\s+/gu).length,
        ...frontmatter
      },
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const enPosts = getPostsPaths('en')
  const esPosts = getPostsPaths('es')

  return {
    paths: [...enPosts, ...esPosts],
    fallback: false
  }
}
