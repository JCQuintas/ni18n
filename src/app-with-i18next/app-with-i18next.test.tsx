/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
import { appWithI18Next } from './app-with-i18next'
import '@testing-library/jest-dom/extend-expect'

it('should throw an error if using without options', () => {
  expect(() => {
    // @ts-expect-error test throwing error
    appWithI18Next(<></>)
  }).toThrowError('No `options` passed to appWithI18Next')
})

const Rendered = () => <>Rendered</>

test.each([
  [{}, {}],
  [{ __ni18n_server__: {} }, {}],
  [{}, { __ni18n_client__: {} }],
  [{ __ni18n_server__: {} }, { __ni18n_client__: {} }],
  [{ __ni18n_server__: { ns: ['ns1', 'ns2'] } }, {}],
  [{}, { __ni18n_client__: { ns: ['ns3', 'ns4'] } }],
  [
    { __ni18n_server__: { ns: ['ns1', 'ns2'] } },
    { __ni18n_client__: { ns: ['ns3', 'ns4'] } },
  ],
])(
  'should properly render a component regardless of ni18n property %#',
  (server, client) => {
    const App = appWithI18Next(Rendered, {})
    render(<App router={{}} pageProps={{ ...server, ...client }} />)

    const element = screen.getByText('Rendered')

    expect(element).toBeInTheDocument()
  },
)

const RenderWithLocale = () => {
  const { i18n } = useTranslation()
  return <>{i18n.options.lng}</>
}

it('should set locale based on __ni18n_locale__ if available', () => {
  const App = appWithI18Next(RenderWithLocale, { supportedLngs: ['en', 'es'] })
  render(
    <App router={{ locale: 'en' }} pageProps={{ __ni18n_locale__: 'es' }} />,
  )

  const element = screen.getByText('es')

  expect(element).toBeInTheDocument()
})
