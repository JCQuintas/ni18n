import { InitOptions } from 'i18next'

export const getNamespaces = (
  options: InitOptions,
  namespacesNeeded?: string | string[],
): string[] => {
  if (Array.isArray(namespacesNeeded) && namespacesNeeded.length > 0)
    return namespacesNeeded
  if (typeof namespacesNeeded === 'string') return [namespacesNeeded]
  return [options.defaultNS || 'translation']
}
