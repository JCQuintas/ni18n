import { isBrowser } from './is-browser'

it('should return false when running in node', () => {
  expect(isBrowser()).toBe(false)
})
