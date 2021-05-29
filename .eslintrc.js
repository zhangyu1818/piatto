module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:compat/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:markdown/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    polyfills: ['Promise'],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'jest', '@typescript-eslint', 'react-hooks', 'unicorn', 'markdown'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
      },
    },
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/static-property-placement': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-cycle': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
  },
}
