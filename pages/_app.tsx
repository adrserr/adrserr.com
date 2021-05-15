import '../styles/globals.css'
import '../styles/prism-vsc-dark-plus.css'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import { IdProvider } from '@radix-ui/react-id'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      defaultTheme="light"
    >
      <IdProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </IdProvider>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
