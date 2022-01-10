import path from 'path'
import { ensureFilesLoad } from './ensure-files-load'
import { defaultPaths } from '../common'

const joinMock = jest.spyOn(path, 'join')

beforeAll(() => {
  jest.clearAllMocks()
})

it('should use translationsFolder when present', async () => {
  const translationFolder = '/test/folder'

  await ensureFilesLoad(translationFolder)

  expect(joinMock).toHaveBeenCalledWith(process.cwd(), translationFolder)
})

it('should use the defaultPaths when there is no translationFolder set', async () => {
  await ensureFilesLoad()
  expect(joinMock).toHaveBeenCalledWith(
    process.cwd(),
    defaultPaths.public,
    defaultPaths.locales,
  )
})
