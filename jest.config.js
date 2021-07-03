module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/{dist,examples}'],
}
