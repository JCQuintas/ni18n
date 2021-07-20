/**
 * @jest-environment jsdom
 */
import React, { PropsWithChildren } from 'react'
import { appWithI18Next } from '../app-with-i18next'
import { renderHook } from '@testing-library/react-hooks'
import { useSyncLanguage } from './use-sync-language'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../use-backend')

const Rendered = ({ children }: PropsWithChildren<unknown>) => {
  return <>{children}</>
}

const App = appWithI18Next(Rendered, {
  supportedLngs: ['en', 'es', 'pt'],
})

const wrapper = ({ children }: PropsWithChildren<unknown>) => (
  <App router={{ locale: 'en' }}>{children}</App>
)

it('should properly change the i18n selected language when receiving new input', async () => {
  const initialProps: { language?: string } = { language: 'en' }

  const { rerender, result, waitForNextUpdate } = renderHook(
    ({ language }) => useSyncLanguage(language),
    {
      wrapper,
      initialProps,
    },
  )

  await waitForNextUpdate()

  expect(result.current.i18n.language).toBe('en')

  rerender({ language: 'es' })

  expect(result.current.i18n.language).toBe('es')

  rerender({ language: 'pt' })

  expect(result.current.i18n.language).toBe('pt')

  // Test branch where i18n.language === input language
  rerender({ language: 'pt' })

  expect(result.current.i18n.language).toBe('pt')
})
