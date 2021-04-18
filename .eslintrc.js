module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:prettier/recommended',
    '@vue/prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
