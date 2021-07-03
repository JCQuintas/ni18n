import { getOptions } from './get-options'

it('should return options when __ni18n__ is undefined', () => {
  const options = { lng: 'option' }
  const __ni18n__ = undefined
  const expected = options

  const result = getOptions(options, __ni18n__)

  expect(result).toStrictEqual(expected)
})

it('should overwrite options when __ni18n__ is defined', () => {
  const options = { lng: 'option' }
  const __ni18n__ = { lng: '__ni18n__', resources: {} }
  const expected = __ni18n__
  const result = getOptions(options, __ni18n__)

  expect(result).toStrictEqual(expected)
})
