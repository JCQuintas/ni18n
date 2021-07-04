import { i18n } from 'i18next'
import useBackend from './server'

it('should call the use function', () => {
  const use = jest.fn()

  useBackend({ use, modules: {} } as unknown as i18n)

  expect(use).toHaveBeenCalledWith(expect.anything())
})

it('should not call the use function if there is a custom backend plugin', () => {
  const use = jest.fn()

  useBackend({ use } as unknown as i18n, [{ type: 'backend' }])

  expect(use).not.toHaveBeenCalled()
})

it('should not call the use function if there is a custom backend plugin inside an array', () => {
  const use = jest.fn()

  useBackend({ use } as unknown as i18n, [[{ type: 'backend' } as never]])

  expect(use).not.toHaveBeenCalled()
})
