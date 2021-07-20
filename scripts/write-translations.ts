import fs from 'fs'
import path from 'path'
import { translations } from '../data/translations'
import { format } from 'prettier'

type Namespaces = 'home' | 'translation' | 'alternate' | 'client'

type DirSchema = {
  example: string
  schema: string
  namespaces: Namespaces[]
}

const languages = Object.keys(translations)
const namespaces = Object.keys(Object.values(translations)[0]) as Namespaces[]

const schemas: DirSchema[] = [
  {
    example: 'custom-backend',
    schema: 'server/locales/{{lng}}/{{ns}}.json',
    namespaces,
  },
  {
    example: 'custom-language-selection',
    schema: 'public/locales/{{lng}}/{{ns}}.json',
    namespaces,
  },
  {
    example: 'custom-location',
    schema: 'public/custom/{{lng}}.{{ns}}.json',
    namespaces,
  },
  {
    example: 'simple',
    schema: 'public/locales/{{lng}}/{{ns}}.json',
    namespaces,
  },
  {
    example: 'typescript',
    schema: 'public/locales/{{lng}}/{{ns}}.json',
    namespaces,
  },
  {
    example: 'cached-translations',
    schema: 'server/locales/{{lng}}/{{ns}}.json',
    namespaces,
  },
]

const targets = schemas
  .map(({ example, schema, namespaces }) =>
    languages
      .map((language) =>
        namespaces
          .map((namespace) => ({
            language,
            namespace,
            namespaces,
            path: path.join(
              'examples',
              example,
              schema.replace('{{lng}}', language).replace('{{ns}}', namespace),
            ),
          }))
          .flat(),
      )
      .flat(),
  )
  .flat()

const makeDirs = (filepath: string) => {
  filepath
    .split('/')
    .slice(0, -1)
    .forEach((segment, index, arr) => {
      const dirPath = path.join(...arr.slice(0, index), segment)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
      }
    })
}

if (require.main === module) {
  targets.forEach((target) => {
    if (target.namespaces.includes(target.namespace)) {
      const data = JSON.stringify(
        translations[target.language as keyof typeof translations][
          target.namespace as keyof typeof translations['en']
        ],
      )

      makeDirs(target.path)
      fs.writeFileSync(target.path, format(data, { parser: 'json' }))
    }
  })
}
