import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'

const ClientTranslationsPage = () => {
  const { t, ready } = useTranslation('client')

  return (
    <>
      <Header />
      <main>
        <h1>{ready ? t('title') : ''}</h1>
        <p>{ready ? t('content') : ''}</p>
      </main>
      <Footer />
    </>
  )
}

export default ClientTranslationsPage
