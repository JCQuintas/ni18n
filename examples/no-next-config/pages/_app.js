import '../public/styles.css'
import { appWithI18Next } from 'ni18n'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const MyApp = ({ Component, pageProps }) => {
  const { i18n } = useTranslation()
  const locale =
    typeof window !== 'undefined' && window.localStorage.getItem('MY_LANGUAGE')

  useEffect(() => {
    if (locale && i18n.language !== locale) i18n.changeLanguage(locale)
  }, [locale, i18n])

  return <Component {...pageProps} />
}

export default appWithI18Next(MyApp, {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'pt'],
  ns: ['alternate', 'home', 'translation'],
})
