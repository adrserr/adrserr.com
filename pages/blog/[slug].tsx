import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next'
import { getMDXComponent } from 'mdx-bundler/client'
import readingTime from 'reading-time'
import { useMemo } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import enLocale from 'date-fns/locale/en-US'
import { useTranslation } from 'react-i18next'
import { Container, Subscribe, ViewsCounter } from '../../components'
import { getMDXCode, getPostBySlug, getPostsPaths } from '../../lib/mdx'
import { Locale } from '../../types'
import { mdxComponents } from '../../components/MdxComponents'

interface BlogProps {
  slug: string
  locale: Locale
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

export default function Blog({ code, frontMatter, locale, slug }: BlogProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  const { t } = useTranslation('common')
  const date = frontMatter.updatedAt
    ? frontMatter.updatedAt
    : frontMatter.publishedAt
  const dateFormat = locale === 'es' ? 'dd MMMM, yyyy' : 'MMMM dd, yyyy'

  return (
    <Container
      title={frontMatter.title}
      type="article"
      publishedAt={frontMatter.publishedAt}
      description={frontMatter.summary}
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-10 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col md:flex-row mt-2 md:items-center justify-between w-full mb-3">
          <div className="flex items-center">
            <Image
              alt="Adrián Serrano"
              src="/avatar.jpg"
              height={24}
              width={24}
              className="rounded-full"
              quality={100}
            />
            <p className="text-sm  text-gray-700 dark:text-gray-300 ml-2">
              Adrián Serrano |{' '}
              {format(new Date(date), dateFormat, {
                locale: locale === 'es' ? esLocale : enLocale
              })}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">
            {`${frontMatter.readingTime.text.replace('read', '')} ${t(
              'blog.readingTime'
            )}`}{' '}
            &#8226; <ViewsCounter slug={slug} locale={locale} />
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          <Component components={mdxComponents as any} />
        </div>
        <div className="mt-8 w-full">
          <Subscribe locale={locale} />
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

  const { code, frontmatter } = await getMDXCode(source.toString())

  return {
    props: {
      slug: params.slug,
      locale,
      code,
      frontMatter: {
        readingTime: readingTime(source.toString()),
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
