import { clientNamespaces } from './client-namespaces'

it('should return an object with the required namespaces', () => {
  expect(clientNamespaces({}, ['ns1', 'ns2'])).toStrictEqual({
    __ni18n_client__: {
      ns: ['ns1', 'ns2', 'translation'],
    },
  })
})

it('should take into account defaultNS when it exists', () => {
  expect(
    clientNamespaces({ defaultNS: 'defaultNS' }, ['ns1', 'ns2']),
  ).toStrictEqual({
    __ni18n_client__: {
      ns: ['ns1', 'ns2', 'defaultNS'],
    },
  })
})
