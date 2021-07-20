/**
 * @jest-environment jsdom
 */
import { isBrowser } from './is-browser'

it('should return true when running in browser/jsdom', () => {
  expect(isBrowser()).toBe(true)
})
