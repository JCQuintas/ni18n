import { loadTranslations } from './load-translations'
import { createI18nInstance } from '../create-i18n-instance'

jest.mock('../create-i18n-instance')

const createI18nInstanceMock = (
  createI18nInstance as jest.Mock
).mockReturnValue({
  services: {
    resourceStore: {
      data: {
        test: {
          ns1: {
            a: 'a',
          },
          ns2: {
            b: 'b',
          },
        },
        language: {
          ns1: {
            a: '1',
          },
          ns2: {
            b: '2',
          },
        },
      },
    },
  },
})

it('should throw error when no options is passed', () => {
  expect(() => {
    // @ts-expect-error test throw
    loadTranslations()
  }).toThrowError('No `options` passed to loadTranslations')
})

it('should return correct values when both parameters are strings', () => {
  const result = loadTranslations({}, 'test', 'ns1')

  expect(result).toStrictEqual({
    __ni18n__: {
      lng: 'test',
      resources: {
        test: {
          ns1: { a: 'a' },
        },
      },
    },
  })
})

it('should return correct values when namespace is an array', () => {
  const result = loadTranslations({}, 'language', ['ns1', 'ns2'])

  expect(result).toStrictEqual({
    __ni18n__: {
      lng: 'language',
      resources: {
        language: {
          ns1: { a: '1' },
          ns2: { b: '2' },
        },
      },
    },
  })
})

it('should return correct values there is no initialLocale but options.lng is set', () => {
  const result = loadTranslations({ lng: 'test' }, undefined, 'ns1')

  expect(result).toStrictEqual({
    __ni18n__: {
      lng: 'test',
      resources: {
        test: {
          ns1: { a: 'a' },
        },
      },
    },
  })
})

it('should return an empty resource object if there is no data', () => {
  createI18nInstanceMock.mockReturnValueOnce({
    services: {
      resourceStore: {},
    },
  })
  const result = loadTranslations({ lng: 'test' }, undefined, 'ns1')

  expect(result).toStrictEqual({
    __ni18n__: {
      lng: 'test',
      resources: {
        test: {
          ns1: {},
        },
      },
    },
  })
})
