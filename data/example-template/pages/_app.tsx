import '../public/styles.css'
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default appWithI18Next(MyApp, ni18nConfig)
