import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const pages = [
  {
    path: '/',
    name: 'home',
    translateKey: 'homePage',
  },

  {
    path: '/server-side-props',
    name: 'server-side-props',
    translateKey: 'serverSidePropsPage',
  },

  {
    path: '/default-namespace',
    name: 'default-namespace',
    translateKey: 'defaultNamespacePage',
  },

  {
    path: '/client-loading',
    name: 'client-loading',
    translateKey: 'clientLoadingPage',
  },

  {
    path: '/client-namespaces',
    name: 'client-namespaces',
    translateKey: 'clientNamespacesPage',
  },
]

export const Footer = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <footer>
      {pages.map((page) => (
        <Link href={page.path} passHref key={page.path}>
          <a>
            <button
              data-id={`${page.name}-page-button`}
              className={router.pathname === page.path ? 'active' : undefined}
            >
              {t(page.translateKey)}
            </button>
          </a>
        </Link>
      ))}
    </footer>
  )
}
