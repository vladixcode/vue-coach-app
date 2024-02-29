/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', '@vue/eslint-config-prettier'],
  rules: {
    // override/add rules settings here, such as:
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    // 'vue/no-unused-vars': 'error'
    // 'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
