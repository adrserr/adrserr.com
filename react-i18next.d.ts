// import the original type declarations
import 'react-i18next'
// import all namespaces (for the default language, only)
import { Resources as MyResources } from './types'

declare module 'react-i18next' {
  // and extend them!
  // eslint-disable-next-line no-unused-vars
  interface Resources extends MyResources {}
}
