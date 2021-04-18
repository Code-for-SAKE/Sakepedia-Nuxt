module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "plugin:nuxt/recommended",
    "@vue/prettier",
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
};
