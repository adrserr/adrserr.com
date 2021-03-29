import { Container } from '../components'

export default function Home() {
  return (
    <Container title="Adrián Serrano - Front End Developer">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-black text-3xl sm:text-5xl tracking-tight mb-4 text-gray-700 dark:text-gray-50">
          Hi, I'm Adrián Serrano 🤟🏽
        </h1>
        <h2 className="prose text-gray-800 dark:text-gray-50 mb-16">
          I'm a Software Engineer, I work at Electronic Arts as Front-End
          Developer with Javascript, Typescript and React. This is my blog, I
          hope you enjoy it.
        </h2>
      </div>
    </Container>
  )
}
