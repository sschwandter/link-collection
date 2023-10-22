module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "2023",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.test.js"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: { "jest/prefer-expect-assertions": "off" },
    },
  ],
};
