import { InitOptions } from 'i18next'
import { uniqueArray } from './unique-array'

export const getNamespaces = (
  options: InitOptions,
  namespacesNeeded?: string | string[],
): string[] => {
  const defaultNS = options.defaultNS || 'translation'

  if (Array.isArray(namespacesNeeded) && namespacesNeeded.length === 0)
    return []

  if (Array.isArray(namespacesNeeded))
    return uniqueArray([...namespacesNeeded, defaultNS])

  if (typeof namespacesNeeded === 'string')
    return uniqueArray([namespacesNeeded, defaultNS])

  return [defaultNS]
}
