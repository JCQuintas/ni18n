import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const Footer = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <footer>
      <Link href="/" passHref>
        <a>
          <button
            data-id="home-page-button"
            className={router.pathname === '/' ? 'active' : undefined}
          >
            {t('homePage')}
          </button>
        </a>
      </Link>
      <Link href="/alternate-page" passHref>
        <a>
          <button
            data-id="alternate-page-button"
            className={
              router.pathname === '/alternate-page' ? 'active' : undefined
            }
          >
            {t('alternatePage')}
          </button>
        </a>
      </Link>
      <Link href="/default-namespace" passHref>
        <a>
          <button
            data-id="default-namespace-page-button"
            className={
              router.pathname === '/default-namespace' ? 'active' : undefined
            }
          >
            {t('defaultNamespacePage')}
          </button>
        </a>
      </Link>
      <Link href="/client-page" passHref>
        <a>
          <button
            data-id="client-page-button"
            className={
              router.pathname === '/client-page' ? 'active' : undefined
            }
          >
            {t('clientPage')}
          </button>
        </a>
      </Link>
    </footer>
  )
}
