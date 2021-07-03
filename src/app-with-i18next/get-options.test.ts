import { getOptions } from './get-options'

test.each([
  [{ lng: 'option' }, undefined, { lng: 'option' }],
  [
    { lng: 'option' },
    { lng: '__ni18n__', resources: {} },
    { lng: '__ni18n__', resources: {} },
  ],
])('should return expected result %#', (options, __ni18n__, expected) => {
  const result = getOptions(options, __ni18n__)

  expect(result).toStrictEqual(expected)
})
