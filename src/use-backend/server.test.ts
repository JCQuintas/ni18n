import { i18n } from 'i18next'
import useBackend from './server'

it('should call the use function', () => {
  const use = jest.fn()

  useBackend({ use, modules: {} } as unknown as i18n)

  expect(use).toHaveBeenCalledWith(expect.anything())
})

it('should not call the use function if modules.backend exists', () => {
  const use = jest.fn()

  useBackend({ use, modules: { backend: {} } } as unknown as i18n)

  expect(use).not.toHaveBeenCalled()
})
