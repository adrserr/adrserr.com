import '../styles/globals.css'
import '../styles/prism-vsc-dark-plus.css'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import { IdProvider } from '@radix-ui/react-id'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IdProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="light"
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </IdProvider>
  )
}

export default appWithTranslation(MyApp)
