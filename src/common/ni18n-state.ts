import type { Resource } from 'i18next'
import { NamespacesNeeded } from './namespaces-needed'

export type Ni18nState = {
  __ni18n__: {
    resources?: Resource
    ns?: NamespacesNeeded
  }
}
