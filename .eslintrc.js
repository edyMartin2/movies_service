module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'complexity'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'complexity': ['error', 10], // Establece el límite de complejidad ciclomática a 10
  },
};
