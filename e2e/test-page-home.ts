import { expect, Page } from '@playwright/test'
import { Language } from './language'
import { testFooter } from './test-footer'
import { testHeader } from './test-header'
import { urlMapper } from './url-mapper'

const homeData = {
  en: {
    title: 'Home Page',
    content: 'To change languages you can select them at the top right.',
    extraContent: 'Use the buttons on the footer to navigate between pages.',
  },
  es: {
    title: 'Página Inicial',
    content:
      'Para cambiar de idioma, puede seleccionarlos en la parte superior derecha.',
    extraContent:
      'Utilice los botones del pie de página para navegar entre páginas.',
  },
  pt: {
    title: 'Página Inicial',
    content:
      'Para trocar a língua você pode selecionar elas no topo direito da página.',
    extraContent: 'Use os botões do rodapé para navegar entre as páginas.',
  },
}

export const testPageHome = async (
  page: Page,
  language: Language,
): Promise<void> => {
  const pageName = 'home'
  await page.goto(urlMapper(language, pageName))

  expect(await page.innerText('main h1')).toBe(homeData[language].title)
  expect(await page.innerText('main p:first-of-type')).toBe(
    homeData[language].content,
  )
  expect(await page.innerText('main p:last-of-type')).toBe(
    homeData[language].extraContent,
  )

  await testHeader(page, language)
  await testFooter(page, language, pageName)
}
