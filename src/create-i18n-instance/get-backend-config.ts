import { InitOptions } from 'i18next'
import { isBrowser } from './is-browser'

export const getBackendConfig = (
  options: InitOptions,
): Record<string, unknown> => {
  const hasCustomBackend = options.backend
  const localePath = '/locales/{{lng}}/{{ns}}'

  // Server side backend config
  if (!isBrowser() && !hasCustomBackend) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')

    return {
      backend: {
        loadPath: path.resolve(process.cwd(), `./public/${localePath}.json`),
      },
    }
  }

  if (isBrowser() && !hasCustomBackend) {
    return {
      backend: {
        loadPath: `${localePath}.json`,
      },
    }
  }

  return {}
}
