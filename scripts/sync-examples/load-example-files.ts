import path from 'path'
import { ExampleSchema } from './configs'
import { FileSchema, loadFiles } from './load-files'

type Return = Promise<{ fileSchemas: FileSchema[] } & ExampleSchema>

export const loadExampleFiles =
  (exampleFilePaths: string[], examplesFolder: string) =>
  async (example: ExampleSchema): Return => {
    const fileSchemas = await Promise.all(
      exampleFilePaths
        .filter((file) =>
          example.isTypescript ? true : file !== 'tsconfig.json',
        )
        .map((filePath) => {
          const filePathWithCorrectExtension = example.isTypescript
            ? filePath
            : filePath.replace(/tsx?$/, 'js')

          return loadFiles(
            path.join(
              examplesFolder,
              example.name,
              filePathWithCorrectExtension,
            ),
            filePathWithCorrectExtension,
          )
        }),
    )

    return {
      ...example,
      fileSchemas,
    }
  }
