import { format, resolveConfig } from 'prettier'
import { transformFileAsync } from '@babel/core'
import path from 'path'
import { promisify } from 'util'
import fs from 'fs'

export type FileSchema = {
  content?: string
  typescript?: string
  javascript?: string
  filename: string
  filenameNoExt: string
  relativePath: string
}

const parseBabel = async (
  filePath: string,
  filename: string,
): Promise<string> => {
  const parsed = await transformFileAsync(filePath, {
    filename,
    retainLines: true,
    presets: ['@babel/preset-typescript'],
  })

  const config = await resolveConfig(process.cwd())

  return format(parsed?.code || '', { ...config, parser: 'babel' })
}

export const loadFiles = async (
  fullPath: string,
  relativePath: string,
): Promise<FileSchema> => {
  const filename = path.basename(fullPath)
  const filenameNoExt = filename.split('.').slice(0, -1).join('.')

  const fileExists = await promisify(fs.exists)(fullPath)

  const fileContent = fileExists
    ? await promisify(fs.readFile)(fullPath, {
        encoding: 'utf-8',
      })
    : ''

  const isJavascript = ['.js', '.jsx'].includes(path.extname(filename))
  const isTypescript = ['.ts', '.tsx'].includes(path.extname(filename))
  const base = {
    filename,
    filenameNoExt,
    relativePath,
  }

  if (fileExists && (isTypescript || isJavascript)) {
    const typescript = isTypescript ? fileContent : undefined
    const javascript = isJavascript
      ? fileContent
      : await parseBabel(fullPath, filename)
    return {
      typescript,
      javascript,
      ...base,
    }
  }

  return {
    content: fileContent,
    ...base,
  }
}
