/**
 * We need this to force Vercel to move the files into the runner
 * https://github.com/vercel/next.js/issues/33133
 */
export const ensureFilesLoad = async () => {
  const { join } = await import('path')

  join(process.cwd(), './public/locales')
}
