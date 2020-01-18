module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'comma-dangle': 'off',
    'vue/html-self-closing': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/no-unused-vars': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-template-shadow': 'off',
    'vue/require-component-is': 'off',
    'no-console': 'off',
    'space-before-function-paren': 'off',
    'unicorn/prefer-includes': 'off',
    'object-shorthand': 'warn',
    curly: 'warn',
    'arrow-parens': 'off',
  },
}
