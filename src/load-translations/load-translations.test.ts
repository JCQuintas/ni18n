import { loadTranslations } from './load-translations'
import { createI18nInstance } from '../create-i18n-instance'

jest.mock('../create-i18n-instance')

const createI18nInstanceMock = (
  createI18nInstance as jest.Mock
).mockReturnValue({
  instance: {
    services: {
      resourceStore: {
        data: {
          test: { ns1: { a: 'a' }, ns2: { b: 'b' } },
          language: { ns1: { a: '1' }, ns2: { b: '2' } },
        },
      },
    },
  },
  init: Promise.resolve(),
})

it('should throw error when no options is passed', async () => {
  // @ts-expect-error test throw
  await expect(loadTranslations()).rejects.toThrowError(
    'No `options` passed to loadTranslations',
  )
})

it('should return correct values when both parameters are strings', async () => {
  const result = await loadTranslations({}, 'test', 'ns1')

  expect(result).toStrictEqual({
    __ni18n__: {
      resources: {
        test: {
          ns1: { a: 'a' },
        },
      },
    },
  })
})

it('should return correct values when namespace is an array', async () => {
  const result = await loadTranslations({}, 'language', ['ns1', 'ns2'])

  expect(result).toStrictEqual({
    __ni18n__: {
      resources: {
        language: {
          ns1: { a: '1' },
          ns2: { b: '2' },
        },
      },
    },
  })
})

it('should return correct values when there is no initialLocale but options.fallbackLng is set', async () => {
  const result = await loadTranslations(
    { lng: 'test', fallbackLng: ['test', 'language'] },
    undefined,
    'ns1',
  )

  expect(result).toStrictEqual({
    __ni18n__: {
      resources: {
        test: { ns1: { a: 'a' } },
        language: { ns1: { a: '1' } },
      },
    },
  })
})

it('should return an empty resource object if there is no data', async () => {
  createI18nInstanceMock.mockReturnValueOnce({
    instance: {
      services: {
        resourceStore: {},
      },
    },
    init: Promise.resolve(),
  })
  const result = await loadTranslations(
    { lng: 'test', fallbackLng: ['test', 'language'] },
    undefined,
    'ns1',
  )

  expect(result).toStrictEqual({
    __ni18n__: {
      resources: {
        test: { ns1: {} },
        language: { ns1: {} },
      },
    },
  })
})
