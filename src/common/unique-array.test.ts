import { uniqueArray } from './unique-array'

it('should return an array with unique values', () => {
  expect(uniqueArray(['a', 'b', 'a', 'b'])).toStrictEqual(['a', 'b'])
})
