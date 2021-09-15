import path from 'path'
import { format } from 'prettier'
import { ExampleSchema } from './configs'
import { FileSchema } from './load-files'
import merge from 'deepmerge'

const getDataFromSchema = (example: ExampleSchema, template?: FileSchema) =>
  template?.content
    ? template.content
    : example.isTypescript && template?.typescript
    ? template.typescript
    : template?.javascript || ''

export const createWriteData =
  (
    examplesFolder: string,
    example: ExampleSchema,
    templateSchemas: FileSchema[],
  ) =>
  (
    fileSchema: FileSchema,
  ): {
    path: string
    data: string
  } => {
    const template = templateSchemas.find(
      (t) => t.filenameNoExt === fileSchema.filenameNoExt,
    )

    const writePath = path.join(
      examplesFolder,
      example.name,
      fileSchema.relativePath,
    )

    const data = getDataFromSchema(example, template)

    if (template?.filename === 'package.json') {
      const packageFile = merge(
        JSON.parse(data),
        JSON.parse(getDataFromSchema(example, fileSchema)),
        {
          customMerge: (key) => {
            if (
              ['peerDependencies', 'dependencies', 'devDependencies'].includes(
                key,
              )
            ) {
              return (a, b) => ({ ...b, ...a })
            }
          },
        },
      )
      return {
        path: writePath,
        data: format(JSON.stringify(packageFile), {
          parser: 'json',
          printWidth: 20,
        }),
      }
    }

    return {
      path: writePath,
      data,
    }
  }
