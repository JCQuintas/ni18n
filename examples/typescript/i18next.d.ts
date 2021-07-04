import 'react-i18next'

// import all namespaces (for the default language, only)
import alternate from './public/locales/en/alternate.json'
import home from './public/locales/en/home.json'
import translation from './public/locales/en/translation.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      alternate: typeof alternate
      home: typeof home
      translation: typeof translation
    }
  }
}
