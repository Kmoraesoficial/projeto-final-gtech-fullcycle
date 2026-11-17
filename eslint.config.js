import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/**', 
      'node_modules/**', 
      'prisma/migrations/**', 
      'jest.config.cjs',
      'eslint.config.js',
      'src/generated/**',
      '**/*.js' // <-- AQUI! Ignora QUALQUER arquivo .js em qualquer pasta
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  }
);