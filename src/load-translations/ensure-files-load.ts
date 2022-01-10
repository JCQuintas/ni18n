import { isBrowser, defaultPaths } from '../common'

const decidePath = (translationsFolder?: string): string[] => {
  if (translationsFolder) return [translationsFolder]
  return [defaultPaths.public, defaultPaths.locales]
}

/**
 * We need this to force Vercel to move the files into the runner
 * https://github.com/vercel/next.js/issues/33133
 */
export const ensureFilesLoad = async (translationsFolder?: string) => {
  if (isBrowser()) return

  const pathToLoad = decidePath(translationsFolder)

  const path = await import('path')

  path.join(process.cwd(), ...pathToLoad)
}
