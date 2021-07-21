import { InitOptions } from 'i18next'

const uniqueArray = (values: string[]) => Array.from(new Set(values))

export const getNamespaces = (
  options: InitOptions,
  namespacesNeeded?: string | string[],
): string[] => {
  const defaultNS = options.defaultNS || 'translation'

  if (Array.isArray(namespacesNeeded))
    return uniqueArray([...namespacesNeeded, defaultNS])
  if (typeof namespacesNeeded === 'string')
    return uniqueArray([namespacesNeeded, defaultNS])
  return [defaultNS]
}
