import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

export const getFilesPaths = async (
  directory: string,
  origin?: string,
): Promise<string[]> => {
  const dir = await promisify(fs.readdir)(directory)

  return dir.reduce(async (files, file) => {
    const absolute = path.join(directory, file)
    const stat = await promisify(fs.stat)(absolute)
    const current = stat.isDirectory()
      ? await getFilesPaths(absolute, origin || directory)
      : [path.relative(origin || directory, absolute)]

    return [...(await files), ...current]
  }, Promise.resolve<string[]>([]))
}
