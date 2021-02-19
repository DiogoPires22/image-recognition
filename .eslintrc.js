module.exports = {
  extends: [
    "eslint:recommended",
     "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  env: {
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // "@typescript-eslint/indent": [2, 2],
    // "no-console": "off",
    // "import/no-unresolved": "off",
    // "import/named": 2,
    // "import/namespace": 2,
    // "import/default": 2,
    // "import/export": 2,
    // "@typescript-eslint/strict-boolean-expressions": "off",
    // "@typescript-eslint/consistent-type-definitions": "off",
    // "import/extensions": "off",
  },
};
