const path = require('path')

module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'no-bitwise': ['error', { allow: ['~'] }],
    'prettier/prettier': 'error',
    'prefer-destructuring': 'off',
    semi: ['error', 'never'],
    'eol-last': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-syntax': 'warn',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'warn',
    'no-use-before-define': ['error', 'nofunc'],
    'import/prefer-default-export': 'warn',
    'consistent-return': 'warn',
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-unresolved': [2, { caseSensitive: false }],
  },
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: [
  //         ['^api', path.resolve(__dirname, './app/api')],
  //         ['^www', path.resolve(__dirname, './app/www')],
  //         ['^admin', path.resolve(__dirname, './app/admin')],
  //       ],
  //     },
  //   },
  // },
}
