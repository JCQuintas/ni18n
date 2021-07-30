export type Pattern = string | RegExp

const createFilePattern = (language: string, namespace: string) =>
  new RegExp(`${language}[/.]${namespace}(.json)?$`)

export const requestPatterns = {
  translationFiles: {
    en: {
      translation: createFilePattern('en', 'translation'),
      home: createFilePattern('en', 'home'),
      alternate: createFilePattern('en', 'alternate'),
      client: createFilePattern('en', 'client'),
    },
    pt: {
      translation: createFilePattern('pt', 'translation'),
      home: createFilePattern('pt', 'home'),
      alternate: createFilePattern('pt', 'alternate'),
      client: createFilePattern('pt', 'client'),
    },
    es: {
      translation: createFilePattern('es', 'translation'),
      home: createFilePattern('es', 'home'),
      alternate: createFilePattern('es', 'alternate'),
      client: createFilePattern('es', 'client'),
    },
  },
}
