/**
 * @jest-environment jsdom
 */
import path from 'path'
import { ensureFilesLoad } from './ensure-files-load'

const joinMock = jest.spyOn(path, 'join')

beforeAll(() => {
  jest.clearAllMocks()
})

it('should return early and not call anything when in browser', async () => {
  await ensureFilesLoad()

  expect(joinMock).not.toHaveBeenCalled()
})
