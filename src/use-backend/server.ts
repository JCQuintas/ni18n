import type { i18n as I18NextClient } from 'i18next'
import FSBackend from 'i18next-fs-backend'

export default (i18n: I18NextClient): I18NextClient => {
  const hasCustomBackend = i18n.modules.backend
  if (!hasCustomBackend) {
    i18n.use(FSBackend)
  }
  return i18n
}
