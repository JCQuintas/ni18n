import { InitOptions } from 'i18next'
import {
  defaultFilePath,
  defaultLocalesPath,
  defaultPublicPath,
  isBrowser,
} from '../common'

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
          defaultPublicPath,
          defaultLocalesPath,
          defaultFilePath,
        ),
      },
    }
  }

  if (isBrowser() && !hasCustomBackend) {
    return {
      backend: {
        loadPath: `${defaultLocalesPath}${defaultFilePath}`,
      },
    }
  }

  return {}
}
