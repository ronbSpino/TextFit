module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue2-recommended", "@vue/typescript/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "vue/max-attributes-per-line": ["error", { singleline: 3, multiline: 1 }],
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "vue/script-setup-uses-vars": "error",
      },
    },
  ],
};
