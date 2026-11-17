import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // 1. Ignorar arquivos que não são TypeScript do código-fonte
    ignores: [
      'dist/**', 
      'node_modules/**', 
      'prisma/migrations/**', 
      'jest.config.cjs', // Ignora o arquivo de config do Jest
      'eslint.config.js'
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  }
);
