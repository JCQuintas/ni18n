import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const Footer = () => {
  const { t, ready } = useTranslation()
  const router = useRouter()
  return (
    <footer>
      <Link href="/" passHref>
        <a>
          <button
            data-id="home-page-button"
            className={router.pathname === '/' ? 'active' : undefined}
          >
            {ready ? t('homePage') : ''}
          </button>
        </a>
      </Link>
      <Link href="/alternate" passHref>
        <a>
          <button
            data-id="alternate-page-button"
            className={router.pathname === '/alternate' ? 'active' : undefined}
          >
            {ready ? t('alternatePage') : ''}
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
            {ready ? t('defaultNamespacePage') : ''}
          </button>
        </a>
      </Link>
    </footer>
  )
}
