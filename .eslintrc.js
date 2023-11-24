/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { tsconfigRootDir: __dirname, project: ["./tsconfig.json"] },
  plugins: ["@typescript-eslint", "tsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next/core-web-vitals",
    "prettier",
  ],
  overrides: [
    {
      files: ["**/*.js", "**/.*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "tsdoc/syntax": "off",
      },
    },
    {
      files: ["src/**/*.stories.tsx"],
      extends: ["plugin:storybook/recommended"],
    },
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    "arrow-body-style": ["warn", "never"],
    camelcase: "warn",
    "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
    "max-lines": ["warn", { max: 100, skipBlankLines: true, skipComments: true }],
    "no-alert": "warn",
    "no-console": "warn",
    "no-else-return": "warn",
    "no-implicit-coercion": "warn",
    "no-return-assign": "warn",
    "no-return-await": "off",
    "no-useless-return": "warn",
    "no-void": ["warn", { allowAsStatement: true }],
    "react/hook-use-state": "warn",
    "react/jsx-boolean-value": ["warn", "never"],
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never", propElementValues: "always" },
    ],
    "react/jsx-fragments": ["warn", "syntax"],
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-no-script-url": "warn",
    "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
    "react/jsx-sort-props": "warn",
    "react/no-array-index-key": "warn",
    "react/no-danger": "warn",
    "react/no-invalid-html-attribute": "warn",
    "react/no-multi-comp": "warn",
    "react/no-namespace": "warn",
    "react/no-unstable-nested-components": "warn",
    "react/no-unused-prop-types": "warn",
    "react/self-closing-comp": "warn",
    "tsdoc/syntax": "warn",
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-exports": [
      "warn",
      { fixMixedExportsWithInlineTypeSpecifier: false },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports", disallowTypeAnnotations: true },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/return-await": ["warn", "in-try-catch"],
    "@typescript-eslint/strict-boolean-expressions": [
      "warn",
      { allowString: false, allowNumber: false, allowNullableObject: false },
    ],
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
  },
};
