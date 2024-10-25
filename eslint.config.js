// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  {
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-mixed-requires': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
  js.configs.recommended,
  ...compat.config({
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
    },
  }),
];
