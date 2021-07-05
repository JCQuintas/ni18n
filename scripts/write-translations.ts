import fs from 'fs'
import path from 'path'
import { translations } from './translations'
import { format } from 'prettier'

type DirSchema = {
  example: string
  schema: string
}

const schemas: DirSchema[] = [
  {
    example: 'custom-backend',
    schema: 'server/locales/{{lng}}/{{ns}}.json',
  },
  {
    example: 'custom-language-selection',
    schema: 'public/locales/{{lng}}/{{ns}}.json',
  },
  {
    example: 'custom-location',
    schema: 'public/custom/{{lng}}.{{ns}}.json',
  },
  {
    example: 'simple',
    schema: 'public/locales/{{lng}}/{{ns}}.json',
  },
  {
    example: 'typescript',
    schema: 'public/locales/{{lng}}/{{ns}}.json',
  },
]

const languages = Object.keys(translations)
const namespaces = Object.keys(Object.values(translations)[0])

const targets = schemas
  .map(({ example, schema }) =>
    languages
      .map((language) =>
        namespaces
          .map((namespace) => ({
            language,
            namespace,
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

targets.forEach((target) => {
  const data = JSON.stringify(
    translations[target.language as keyof typeof translations][
      target.namespace as keyof typeof translations['en']
    ],
  )

  fs.writeFileSync(target.path, format(data, { parser: 'json' }))
})
