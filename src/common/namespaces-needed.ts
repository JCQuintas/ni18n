import type { Namespace } from 'react-i18next'

// For some reason if we don't reassign `Namespace` it gets compiled into `Namespace<string>`
export type NamespacesNeeded = Namespace
