import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  // Ignore server directory to avoid conflicts
  {
    ignores: ['dist/**/*', 'build/**/*', 'node_modules/**/*', 'public/**/*', '.react-router/**/*'],
  },

  // Base configuration for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Apply recommended configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // React-specific settings
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    },
  },

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
