import { isBrowser } from './is-browser'

it('should return false when window is undefined', () => {
  expect(isBrowser()).toBe(false)
})

it('should return true when window is defined', () => {
  ;(global.window as unknown) = {}
  expect(isBrowser()).toBe(true)
})
