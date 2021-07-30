import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'
import { GetServerSideProps } from 'next'
import { clientNamespaces } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

const ClientNamespacesPage = () => {
  const { t } = useTranslation('client')

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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ...(await clientNamespaces(ni18nConfig, ['client', 'translation'])),
    },
  }
}

export default ClientNamespacesPage
