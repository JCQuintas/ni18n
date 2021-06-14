import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'

const IndexPage = () => {
  const { t } = useTranslation('home')
  return (
    <>
      <Header />
      <main>
        <h1>{t('title')}</h1>
        <p>{t('content')}</p>
        <p>{t('extraContent')}</p>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async () => ({
  props: {},
})

export default IndexPage
