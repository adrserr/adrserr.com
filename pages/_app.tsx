import '../styles/globals.css'
import '../styles/prism-vsc-dark-plus.css'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import { IdProvider } from '@radix-ui/react-id'

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
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
