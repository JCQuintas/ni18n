import { createI18nInstance } from './create-i18n-instance'

it('should create an i18n instance regardless of input', () => {
  const result = createI18nInstance({})

  expect(result).toBeDefined()
  expect(result.isInitialized).toBe(true)
})
