import path from 'path'

export type ExampleSchema = {
  name: string
  isTypescript?: boolean
}

export const exampleDataFolder = path.join(
  process.cwd(),
  'data',
  'example-template',
)

export const examplesFolder = path.join(process.cwd(), 'examples')

export const exampleSchemas: ExampleSchema[] = [
  {
    name: 'custom-backend',
  },
  {
    name: 'custom-language-selection',
  },
  {
    name: 'custom-location',
  },
  {
    name: 'simple',
  },
  {
    name: 'typescript',
    isTypescript: true,
  },
  {
    name: 'cached-translations',
  },
]
