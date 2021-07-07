import '../public/styles.css'
import { appWithI18Next, useSyncLanguage } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

const MyApp = ({ Component, pageProps }) => {
  const locale =
    typeof window !== 'undefined' && window.localStorage.getItem('MY_LANGUAGE')

  useSyncLanguage(locale)

  return <Component {...pageProps} />
}

export default appWithI18Next(MyApp, ni18nConfig)
