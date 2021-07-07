/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { appWithI18Next } from './app-with-i18next'
import '@testing-library/jest-dom/extend-expect'

it('should throw an error if using without options', () => {
  expect(() => {
    // @ts-expect-error test throwing error
    appWithI18Next(<></>)
  }).toThrowError('No `options` passed to appWithI18Next')
})

const Rendered = () => <>Rendered</>

it('should properly render a component', () => {
  const App = appWithI18Next(Rendered, {})
  render(<App router={{}} />)

  const element = screen.getByText('Rendered')

  expect(element).toBeInTheDocument()
})
