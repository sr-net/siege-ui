module.exports = {
  extends: [
    'plugin:@beequeue/base',
    'plugin:@beequeue/vue',
    'plugin:@beequeue/typescript',
    'plugin:@beequeue/prettier',
  ],
  env: {
    es2021: true,
    browser: true,
  },
  rules: {},
}
