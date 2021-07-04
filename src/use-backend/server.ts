import type { i18n as I18NextClient } from 'i18next'
import FSBackend from 'i18next-fs-backend'

type Type = { type: string }

export default (
  i18n: I18NextClient,
  plugins?: Parameters<I18NextClient['use']>[0][],
): I18NextClient => {
  const hasCustomBackend = plugins?.some((plugin) =>
    Array.isArray(plugin)
      ? plugin.some((p) => (p as Type).type === 'backend')
      : (plugin as Type).type === 'backend',
  )
  if (!hasCustomBackend) {
    i18n.use(FSBackend)
  }
  return i18n
}
