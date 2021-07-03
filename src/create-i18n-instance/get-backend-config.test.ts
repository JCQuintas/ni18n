import { getBackendConfig } from './get-backend-config'
import { isBrowser } from './is-browser'

jest.mock('./is-browser')

it('should return the backend plugin config if not in browser and no custom backend', () => {
  const result = getBackendConfig({})

  expect(result).toStrictEqual({
    backend: {
      addPath:
        '/home/jcquintas/ni18n/public/locales/{{lng}}/{{ns}}.missing.json',
      loadPath: '/home/jcquintas/ni18n/public/locales/{{lng}}/{{ns}}.json',
    },
  })
})

it('should return empty in case options has a backend config', () => {
  const result = getBackendConfig({
    backend: {},
  })

  expect(result).toStrictEqual({})
})

it('should return preload with all supported languages if browser', () => {
  ;(isBrowser as jest.Mock).mockReturnValue(true)

  const result = getBackendConfig({
    supportedLngs: ['test', 'language'],
  })

  expect(result).toStrictEqual({
    preload: ['test', 'language'],
  })
})
