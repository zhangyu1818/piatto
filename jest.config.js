module.exports = {
  verbose: true,
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^piatto$': '<rootDir>/components/index.tsx',
  },
  testEnvironment: 'jsdom',
}
