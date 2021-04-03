import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '../components'

const CV = () => <Container>This is my CV</Container>

export default CV
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
