import '../public/styles.css'
import { appWithI18Next } from 'ni18n'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation'],
})
