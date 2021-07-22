import { getNamespaces } from './get-namespaces'

it('should return namespacesNeeded plus defaultNS when it is an array with values', () => {
  const result = getNamespaces({ defaultNS: 'defaultNS' }, ['ns1', 'ns2'])

  expect(result).toStrictEqual(['ns1', 'ns2', 'defaultNS'])
})

it('should return namespacesNeeded when it is an array with no values', () => {
  const result = getNamespaces({ defaultNS: 'defaultNS' }, [])

  expect(result).toStrictEqual([])
})

it('should return namespacesNeeded plus defaultNS when it is a string', () => {
  const result = getNamespaces({ defaultNS: 'defaultNS' }, 'ns1')

  expect(result).toStrictEqual(['ns1', 'defaultNS'])
})

it('should return option.defaultNS when namespacesNeeded is not an array nor string', () => {
  const result = getNamespaces({ defaultNS: 'defaultNS' }, undefined)

  expect(result).toStrictEqual(['defaultNS'])
})

it('should return translation if there is no defaultNS', () => {
  const result = getNamespaces({}, undefined)

  expect(result).toStrictEqual(['translation'])
})
