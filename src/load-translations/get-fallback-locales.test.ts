import { getFallbackLocales } from './get-fallback-locales'

it('should return fallbackLng if it is a string', () => {
  const result = getFallbackLocales({
    fallbackLng: 'test',
  })

  expect(result).toStrictEqual(['test'])
})

it('should return fallbackLng if it is an array', () => {
  const result = getFallbackLocales({
    fallbackLng: ['test', 'language'],
  })

  expect(result).toStrictEqual(['test', 'language'])
})

it('should return flattened values of fallbackLng if it is an object', () => {
  const result = getFallbackLocales({
    fallbackLng: {
      test: ['test', 'test2'],
      language: ['language'],
    },
  })

  expect(result).toStrictEqual(['test', 'test2', 'language'])
})

it('should return empty array if fallbackLng is null', () => {
  const result = getFallbackLocales({
    // @ts-expect-error testing behavior
    fallbackLng: null,
  })

  expect(result).toStrictEqual([])
})
