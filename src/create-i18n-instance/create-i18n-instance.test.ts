import { createI18nInstance } from './create-i18n-instance'
import i18n from 'i18next'

/**
 * Needs to mock out the backend as HTTP backend times out
 * when initializing
 */
jest.mock('../use-backend')

class Plugin {
  type: 'backend' = 'backend'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}
}

it('should create an i18n instance regardless of input', async () => {
  const { instance, init } = createI18nInstance({})

  await init

  expect(instance).toBeDefined()
  expect(instance.isInitialized).toBe(true)
})

it('should create an i18n instance and call use with the plugins', () => {
  const use = jest.fn()
  const init = jest.fn()
  jest
    .spyOn(i18n, 'createInstance')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockReturnValue({ use, init } as any)
  createI18nInstance({}, [Plugin])

  expect(init).toHaveBeenCalledTimes(1)
  expect(use).toHaveBeenCalledWith(Plugin)
})

test.each([
  [false, true, false, true],
  [undefined, undefined, true, false],
])(
  'should respect user settings if they are set or use defaults if not %#',
  async (inputBundle, inputSuspense, outputBundle, outputSuspense) => {
    const use = jest.fn()
    const init = jest.fn()
    jest
      .spyOn(i18n, 'createInstance')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValue({ use, init } as any)

    createI18nInstance({
      partialBundledLanguages: inputBundle,
      react: {
        useSuspense: inputSuspense,
      },
    })

    expect(init).toHaveBeenCalledWith({
      backend: expect.anything(),
      partialBundledLanguages: outputBundle,
      react: {
        useSuspense: outputSuspense,
      },
    })
  },
)
