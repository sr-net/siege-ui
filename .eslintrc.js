module.exports = {
  extends: [
    "plugin:@beequeue/base",
    "plugin:@beequeue/vue",
    "plugin:@beequeue/typescript",
  ],
  env: {
    es2021: true,
    browser: true,
  },
  overrides: [
    {
      files: ["src/**/*.vue"],
      rules: {
        "unicorn/consistent-function-scoping": "off",
        "vue/require-expose": "off",
        "vue/multi-word-component-names": "off",
      },
    },
  ],
}
