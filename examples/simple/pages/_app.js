import '../public/styles.css'
import { appWithI18Next } from 'ni18n'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, {
  resources: {
    en: {
      alternate: require('../public/locales/en/alternate.json'),
      home: require('../public/locales/en/home.json'),
      translation: require('../public/locales/en/translation.json'),
    },
    es: {
      alternate: require('../public/locales/es/alternate.json'),
      home: require('../public/locales/es/home.json'),
      translation: require('../public/locales/es/translation.json'),
    },
    pt: {
      alternate: require('../public/locales/pt/alternate.json'),
      home: require('../public/locales/pt/home.json'),
      translation: require('../public/locales/pt/translation.json'),
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation'],
})
