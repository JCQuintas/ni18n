import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import { GetServerSideProps } from 'next'

const ServerSidePropsPage = () => {
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

export const getServerSideProps: GetServerSideProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'alternate',
        'translation',
      ])),
    },
  }
}

export default ServerSidePropsPage
