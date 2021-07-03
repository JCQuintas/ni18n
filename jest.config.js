module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.{ts,tsx}'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    'use-backend': '<rootDir>/src/use-backend/browser.ts',
  },
}
