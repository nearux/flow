import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import tailwindcss from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@next/next': nextPlugin,
      tailwindcss: tailwindcss,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],

      '@next/next/no-html-link-for-pages': 'off',

      'no-console': 'warn',

      'no-undef': 'off',

      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'error',
    },
  },
  prettier,
];
