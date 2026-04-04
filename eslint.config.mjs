import js from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import i18nextPlugin from 'eslint-plugin-i18next';
import globals from 'globals';

export default [
  { ignores: ['build/**', 'public/**', 'src/config.ts'] },
  js.configs.recommended,
  // TypeScript preset configs — spread directly into the array (avoids tseslint.config()
  // InfiniteDepthConfigWithExtends constraint which is incompatible with CompatibleConfig[])
  ...tsPlugin.configs['flat/recommended-type-checked'],
  ...tsPlugin.configs['flat/strict'],
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      // Expose only meta+rules — configs.recommended.plugins is string[] (legacy) which
      // conflicts with the Plugin type expected by ESLint flat config
      'react-hooks': { meta: reactHooksPlugin.meta, rules: reactHooksPlugin.rules },
      prettier: prettierPlugin,
      i18next: fixupPluginRules(i18nextPlugin),
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React recommended + jsx-runtime rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      // React Hooks recommended rules
      ...reactHooksPlugin.configs.recommended.rules,
      // Disable formatting rules that conflict with Prettier
      ...prettierConfig.rules,
      // Prettier
      'prettier/prettier': 'error',
      // General
      'no-console': 'error',
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-unused-vars': 'off',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-useless-return': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',
      'no-useless-catch': 'error',
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'error',
      'no-self-compare': 'error',
      'no-promise-executor-return': 'error',
      'require-atomic-updates': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'default-case-last': 'error',
      'dot-notation': 'off',
      'no-else-return': 'error',
      'no-empty-function': 'off',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'prefer-destructuring': ['error', { array: false, object: true }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
      // React overrides
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      // React Hooks overrides
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      // Magic values — all non-trivial numbers must be named constants in config.ts
      '@typescript-eslint/no-magic-numbers': 'error',
      // i18n — no hardcoded user-facing strings in JSX
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-only',
          'jsx-attributes': {
            include: ['aria-label', 'alt', 'title', 'placeholder'],
          },
          words: {
            exclude: ['^[^a-zA-Z]*$'],
          },
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/styles/theme.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^https?:\\/\\//]',
          message: 'URL strings must be defined as named constants in src/config.ts',
        },
        {
          selector: 'Literal[value=/^mailto:/]',
          message: 'Protocol strings must be defined as named constants in src/config.ts',
        },
        {
          selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
          message: 'Raw hex colour values must be defined in src/styles/theme.ts',
        },
      ],
    },
  },
];
