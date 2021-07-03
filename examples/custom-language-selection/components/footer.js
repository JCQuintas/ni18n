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
          <button className={router.pathname === '/' ? 'active' : undefined}>
            {t('homePage')}
          </button>
        </a>
      </Link>
      <Link href="/alternate" passHref>
        <a>
          <button
            className={router.pathname === '/alternate' ? 'active' : undefined}
          >
            {t('alternatePage')}
          </button>
        </a>
      </Link>
    </footer>
  )
}
