import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BlogPost, Container } from '../components'
import { getAllPostsSummaryByLocale } from '../lib/mdx'
import { Locale } from '../types'

export default function Home({ posts }: any) {
  const { t } = useTranslation('common')
  // TODO: type
  const latestPosts = posts.slice(0, 3)

  return (
    <Container title="Adrián Serrano - Front End Developer">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          {t('index.title')}
        </h1>
        <h2 className="text-gray-700 dark:text-gray-300 mb-16">
          {t('index.description')}
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          {t('index.recentPosts')}
        </h3>
        {latestPosts.map((
          blogPost: any // TODO:
        ) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <BlogPost key={`${blogPost.slug}-${blogPost.locale}`} {...blogPost} />
        ))}
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const posts = getAllPostsSummaryByLocale(locale as Locale)
  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}
