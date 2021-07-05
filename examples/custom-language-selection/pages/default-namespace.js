import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

const DefaultNamespacePage = () => {
  const { t } = useTranslation()

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

export const getServerSideProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale)),
    },
  }
}

export default DefaultNamespacePage
