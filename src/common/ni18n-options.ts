import type { InitOptions, i18n as I18NextClient } from 'i18next'

export type Ni18nOptions = InitOptions & {
  /**
   * Array of plugins for the i18n instance to use. Accepts the same values as `i18n.use()`
   * @default undefined
   */
  use?: Parameters<I18NextClient['use']>[0][]
  /**
   * The root folder that contains all the translation files.
   * Eg: `/public/translations`
   *
   * __Only necessary if you are encountering issues when deploying to Vercel.__
   *
   * @default undefined
   */
  translationsFolder?: string
}
