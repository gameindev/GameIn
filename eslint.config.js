import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
// import prettier from 'eslint-plugin-prettier' // uncomment if using Prettier

export default [
  // Ignore build and config files
  { ignores: ['dist', 'build', 'node_modules', '.vite', '.next'] },

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      // prettier, // optional
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': { node: { extensions: ['.js', '.jsx'] } },
    },

    rules: {
      // Base JS rules
      ...js.configs.recommended.rules,

      // React and Hooks rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,

      // Import order and hygiene
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'warn',

      // Variables
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],

      // React Refresh (Vite / Fast Refresh)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // General best practices
      'react/prop-types': 'off', // if using TypeScript or prop validation elsewhere
      'react/react-in-jsx-scope': 'off', // not needed in React 17+
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Optional Prettier integration (uncomment if using)
      'prettier/prettier': 'warn',
    },
  },
]
