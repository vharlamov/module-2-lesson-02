module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard", "plugin:react/jsx-runtime"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: "off",
    indent: [0, 2],
    "object-curly-spacing": "off",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "no-trailing-spaces": "off",
    "multiline-ternary": "off",
    "prefer-const": "off",
    "no-unused-vars": "off",
    "no-useless-return": "off",
    "no-useless-escape": "off"
  }
}
