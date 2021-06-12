import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { Container } from '../components'

interface ItemProps {
  company: string
  position: string
  from: Date | string
  to: Date | string
  description: string
}
const Item = ({ company, position, from, to, description }: ItemProps) => (
  <li>
    <div className="flex flex-col">
      <h3 className="text-gray-900 dark:text-gray-50 mt-3 mb-2 font-semibold text-lg">
        {company} — {position}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-2">
        {from} — {to}
      </p>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </li>
)

const About = () => {
  const { t } = useTranslation('common')
  return (
    <Container title={t('about.metaTitle')}>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          {t('about.aboutMe')}
        </h1>
        <div className="mb-8 prose leading-6 text-gray-600 dark:text-gray-300">
          <p>{t('about.intro1')}</p>
          <p>{t('about.intro2')}</p>
        </div>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-gray-50">
          {t('about.experience')}
        </h1>
        <div className="mb-8 leading-6 text-gray-600 dark:text-gray-300">
          <ul className="">
            {/* <ul className="list-none"> */}
            <Item
              company="Electronic Arts"
              position="Front-End Developer"
              from="2020"
              to="Currently"
              description={t('about.ea')}
            />
            <Item
              company="Minsait"
              position="Front-End Developer"
              from="2017"
              to="2020"
              description={t('about.minsait')}
            />
          </ul>
        </div>
      </div>
    </Container>
  )
}
export default About

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
