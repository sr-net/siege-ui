import antfu from "@antfu/eslint-config"

const sortImports = {
  "perfectionist/sort-imports": [
    "error",
    {
      type: "natural",
      internalPattern: ["^@/", "^~/", "^#[a-zA-Z0-9-]+/"],
      newlinesBetween: "always",
      groups: [
        ["builtin", "builtin-type"],
        ["external", "external-type"],
        ["internal", "internal-type"],
        ["parent", "parent-type"],
        ["sibling", "sibling-type"],
        ["index", "index-type"],
        "object",
        "unknown",
      ],
    },
  ],
}

export default antfu({
  ignores: ["**/*.json"],

  markdown: false,
  stylistic: false,
  jsonc: false,
  jsx: false,
  toml: false,

  vue: {
    overrides: {
      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "style"],
        },
      ],
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  typescript: {
    tsconfigPath: "tsconfig.json",
    ignoresTypeAware: ["copy.ts", "*.config.*"],

    overridesTypeAware: {
      "ts/no-floating-promises": [
        "error",
        {
          allowForKnownSafeCalls: [
            { from: "package", package: "node:test", name: ["describe", "it", "test"] },
          ],
        },
      ],
    },

    overrides: {
      "antfu/no-top-level-await": "off",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "node/prefer-global/process": "off",
      "ts/consistent-type-definitions": "off",
      "ts/consistent-type-imports": [
        "error",
        { fixStyle: "inline-type-imports", disallowTypeAnnotations: false },
      ],
      "ts/no-unsafe-argument": "off",
      "ts/no-unsafe-assignment": "off",
      "ts/no-use-before-define": "off",
      "unused-imports/no-unused-vars": "off",

      ...sortImports,
    },
  },
})
