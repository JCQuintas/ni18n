import { getBackendConfig } from './get-backend-config'
import path from 'path'

it('should return the backend plugin config if not in browser and no custom backend', () => {
  const result = getBackendConfig({})

  expect(result).toStrictEqual({
    backend: {
      loadPath: path.resolve(
        process.cwd(),
        './public/locales/{{lng}}/{{ns}}.json',
      ),
    },
  })
})

it('should return empty in case options has a backend config', () => {
  const result = getBackendConfig({
    backend: {},
  })

  expect(result).toStrictEqual({})
})
