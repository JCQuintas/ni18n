import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useTranslation } from 'react-i18next'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../components/config'
import { GetStaticProps } from 'next'

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

export const getStaticProps: GetStaticProps = async (props) => {
  return {
    props: {
      ...loadTranslations(ni18nConfig, props.locale, [
        'alternate',
        'translation',
      ]),
    },
  }
}

export default AlternatePage
