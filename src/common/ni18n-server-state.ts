import type { Resource } from 'i18next'
import { NamespacesNeeded } from './namespaces-needed'

export type Ni18nServerState = {
  __ni18n_server__: {
    resources: Resource
    ns: NamespacesNeeded
  }
}
