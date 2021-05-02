import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Container } from '../components'

const NotFound = () => {
  const { t } = useTranslation('common')
  return (
    <Container title="404 Not Found - Adrián Serrano">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          404 - {t('404.notFound')}
        </h1>
        <p className="md:text-lg text-gray-600 dark:text-gray-300 mb-8">
          {t('404.message')}
        </p>
        <Link href="/">
          <a className="bg-gray-200 dark:bg-gray-700 rounded self-center py-4 px-4 w-80 text-center">
            {t('404.goHome')}
          </a>
        </Link>
      </div>
    </Container>
  )
}

export default NotFound

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
