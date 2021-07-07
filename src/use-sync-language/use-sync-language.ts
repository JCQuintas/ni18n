import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export const useSyncLanguage = (language?: string): void => {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (language && i18n.language !== language) i18n.changeLanguage(language)
  }, [language, i18n])
}
