import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'
import { loadTranslations } from 'ni18n'

const AlternatePage = () => {
  const { t } = useTranslation('alternate')
  return (
    <>
      <Header />
      <main>
        <h1>{t('title')}</h1>
        <p>{t('content')}</p>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = (props) => {
  return {
    props: {
      ...loadTranslations(
        {
          lng: 'en',
          fallbackLng: 'en',
          supportedLngs: ['en', 'es', 'pt'],
          ns: ['alternate', 'home', 'translation'],
        },
        props.locale,
        ['alternate', 'translation'],
      ),
    },
  }
}

export default AlternatePage
