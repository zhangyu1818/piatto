const path = require('path')

const libDir = process.env.LIB_DIR === undefined ? 'components' : process.env.LIB_DIR

module.exports = {
  verbose: true,
  setupFiles: [path.resolve('./tests/setup.js')],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^piatto$': [`<rootDir>/${libDir}/index.js`, `<rootDir>/${libDir}/index.tsx`],
    '^piatto/(.*)': `<rootDir>/${libDir}/$1`,
  },
  testEnvironment: 'jsdom',
}
