import '../styles/globals.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'

library.add(fab)

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
