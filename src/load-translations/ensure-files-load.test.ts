import path from 'path'
import { ensureFilesLoad } from './ensure-files-load'

const joinMock = jest.spyOn(path, 'join')

beforeAll(() => {
  jest.clearAllMocks()
})

it('should use the defaultPaths when there is no translationFolder set', async () => {
  await ensureFilesLoad()
  expect(joinMock).toHaveBeenCalledWith(process.cwd(), './public/locales')
})
