module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ["eslint:recommended", "node:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "2023",
    sourceType: "module",
  },
};
