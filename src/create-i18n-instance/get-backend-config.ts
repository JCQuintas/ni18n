import { InitOptions } from 'i18next'
import { isBrowser } from './is-browser'

const publicPath = './public'
const localesPath = '/locales'
const filePath = '/{{lng}}/{{ns}}.json'

export const getBackendConfig = (
  options: InitOptions,
): Record<string, unknown> => {
  const hasCustomBackend = options.backend

  // Server side backend config
  if (!isBrowser() && !hasCustomBackend) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path')

    return {
      backend: {
        loadPath: path.join(process.cwd(), publicPath, localesPath, filePath),
      },
    }
  }

  if (isBrowser() && !hasCustomBackend) {
    return {
      backend: {
        loadPath: `${localesPath}${filePath}`,
      },
    }
  }

  return {}
}
