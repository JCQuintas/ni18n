import '../public/styles.css'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../components/config'
import HttpBackend from 'i18next-http-backend'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, ni18nConfig, [HttpBackend])
