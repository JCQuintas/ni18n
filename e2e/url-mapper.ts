import { Language } from './language'

const languagePath = {
  en: '',
  es: 'es/',
  pt: 'pt/',
}

const pagePath = {
  home: '',
  alternate: 'alternate/',
}

type Page = 'home' | 'alternate'

export const urlMapper = (language: Language, page: Page): string =>
  `http://localhost:3000/${languagePath[language]}${pagePath[page]}`
