import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '../components'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <Container title="Adrián Serrano - Front End Developer">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-black text-3xl sm:text-5xl tracking-tight mb-4 text-gray-700 dark:text-gray-50">
          {t('index.title')}
        </h1>
        <h2 className="prose text-gray-700 dark:text-gray-50 mb-16">
          {t('index.description')}
        </h2>
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
