import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '../components'

const About = () => <Container>This is about me</Container>
export default About

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
