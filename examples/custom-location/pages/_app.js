import '../public/styles.css'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../components/config'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, ni18nConfig)
