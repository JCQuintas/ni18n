import type { InitOptions, i18n as I18NextClient } from 'i18next'

export type Ni18nOptions = InitOptions & {
  use?: Parameters<I18NextClient['use']>[0][]
}
