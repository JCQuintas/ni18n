import { defaultLocalesPath, defaultPublicPath, isBrowser } from '../common'

/**
 * We need this to force Vercel to move the files into the runner
 * https://github.com/vercel/next.js/issues/33133
 */
export const ensureFilesLoad = async () => {
  if (isBrowser()) return

  const { join } = await import('path')

  join(process.cwd(), defaultPublicPath, defaultLocalesPath)
}
