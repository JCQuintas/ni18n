import { createI18nInstance } from './create-i18n-instance'
import i18n from 'i18next'
import { isBrowser } from './is-browser'

jest.mock('./is-browser')

const isBrowserMock = isBrowser as jest.Mock

class Plugin {
  type: 'backend' = 'backend'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}
}

it('should create an i18n instance regardless of input', () => {
  isBrowserMock.mockReturnValue(false)
  const { instance } = createI18nInstance({})

  expect(instance).toBeDefined()
  expect(instance.isInitialized).toBe(true)
})

it('should create an i18n instance and call use with the plugins', () => {
  isBrowserMock.mockReturnValue(true)

  const use = jest.fn()
  const init = jest.fn()
  jest
    .spyOn(i18n, 'createInstance')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockReturnValue({ use, init } as any)
  createI18nInstance({ react: { useSuspense: false } }, [Plugin])

  expect(init).toHaveBeenCalledTimes(1)
  expect(use).toHaveBeenCalledWith(Plugin)
})
