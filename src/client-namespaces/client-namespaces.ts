import { InitOptions } from 'i18next'
import { getNamespaces, NamespacesNeeded, Ni18nClientState } from '../common'

export const clientNamespaces = (
  options: InitOptions,
  namespacesNeeded: NamespacesNeeded,
): Ni18nClientState => ({
  __ni18n_client__: {
    ns: getNamespaces(options, namespacesNeeded),
  },
})
