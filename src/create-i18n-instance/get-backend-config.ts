import { InitOptions } from 'i18next'
import { defaultPaths, isBrowser } from '../common'

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
        loadPath: path.join(
          process.cwd(),
          defaultPaths.public,
          defaultPaths.locales,
          defaultPaths.file,
        ),
      },
    }
  }

  if (isBrowser() && !hasCustomBackend) {
    return {
      backend: {
        loadPath: `${defaultPaths.locales}${defaultPaths.file}`,
      },
    }
  }

  return {}
}
