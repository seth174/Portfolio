// eslint.config.js

import pluginReact from 'eslint-plugin-react';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["build/"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      react: pluginReact,
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
];
