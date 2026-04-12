import storybook from "eslint-plugin-storybook";
import sonarjs from "eslint-plugin-sonarjs";
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
    files: ['.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

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
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
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
        {
          selector: 'JSXAttribute[name.name="role"] > Literal',
          message: 'Use AriaRole constant instead of a string literal for role attributes',
        },
        {
          selector: 'Literal[value=/^(_blank|noopener noreferrer|smooth|alternate|high)$/]',
          message: 'Use a named constant from src/config.ts instead of this string literal',
        },
        {
          selector: 'JSXAttribute > Literal[value!=""]',
          message: 'String literals in JSX attributes must be named constants in src/config.ts or src/types.ts',
        },
        {
          selector: 'TemplateLiteral > TemplateElement[value.raw="/"]',
          message: 'Use ROOT_PATH constant instead of a literal "/" in template strings',
        },
        {
          selector: 'JSXExpressionContainer > Literal[raw=/^[0-9]/]',
          message: 'Numeric literals in JSX props must be named constants in src/config.ts',
        },
        {
          selector: 'BinaryExpression > CallExpression > MemberExpression[property.name="getAttribute"]',
          message: 'Use getByRole/getAllByRole instead of getAttribute("role") comparisons',
        },
        {
          selector: 'CallExpression[callee.property.name=/^(get|find|query)(All)?ByRole$/] > Literal',
          message: 'Use AriaRole enum instead of a string literal for role queries',
        },
        {
          selector: 'JSXText[value=/\\S/]',
          message: 'Standalone text in JSX must be a named constant or translation — no bare text nodes',
        },
        {
          selector: 'JSXAttribute[name.name=/^(alt|title|placeholder|aria-label)$/] JSXExpressionContainer > TemplateLiteral',
          message: 'Template literals in alt/title/placeholder/aria-label must use translation keys via t()',
        },
        {
          selector: 'CallExpression[callee.property.name=/^(get|find|query)(All)?ByAltText$/] > TemplateLiteral',
          message: 'Template literals in getByAltText must use a translation key helper, not a hardcoded string',
        },
        {
          selector: 'ArrayExpression > Literal[value=/^(Fa|Si|Di|Ai|Io|Bi)[A-Z]/]',
          message: 'Icon names must be derived from Object.keys(iconMap), not hardcoded in arrays',
        },
        {
          selector: 'ObjectExpression:has(Property[key.name="iconName"]) > Property[key.name=/^(name|iconName)$/] > Literal',
          message: 'Skill objects must use data from en.skillsData, not hardcoded literals',
        },
        {
          selector: 'ObjectExpression:has(Property[key.name="highlights"]) > Property[key.name=/^(title|role|description)$/] > Literal',
          message: 'Project objects must use data from en.projectsData, not hardcoded literals',
        },
        {
          selector: 'ObjectExpression:has(Property[key.name="email"]):has(Property[key.name="github"]) > Property[key.name=/^(name|title|bio|image|email|github|university)$/] > Literal',
          message: 'Profile objects must use data from en.profile, not hardcoded literals',
        },
        {
          selector: 'VariableDeclarator[id.name=/^(mock|test)[A-Z]/] > Literal[raw=/^[\'\"]/]',
          message: 'Test variable string literals must be named constants in src/config.ts or use data from en.json',
        },
        {
          selector: 'Property[key.name="key"] > Literal',
          message: 'Use KeyboardKey constant instead of a string literal for key event values',
        },
        {
          selector: 'Property[key.name="code"] > Literal',
          message: 'Use KeyCode constant instead of a string literal for key code values',
        },
        {
          selector: 'BinaryExpression:not([left.type="UnaryExpression"][left.operator="typeof"]):not([right.type="UnaryExpression"][right.operator="typeof"]) > Literal[raw=/^[\'\"]/][value!=""]',
          message: 'String literals in comparisons must be named constants in src/config.ts or src/types.ts',
        },
        {
          selector: 'CallExpression[callee.property.name=/^(toHaveAttribute|toHaveProperty|toHaveStyle)$/] > Literal',
          message: 'Strings in toHaveAttribute/toHaveProperty/toHaveStyle must be named constants in src/config.ts',
        },
        {
          selector: 'Property[key.name=/^(clientX|clientY|pageX|pageY)$/] > Literal',
          message: 'Touch/mouse coordinates must be named constants in src/config.ts',
        },
        {
          selector: 'Property[key.name=/^(top|left|bottom|right|width|height)$/] > Literal[raw=/^[0-9]/]',
          message: 'Bounding rect dimensions must be named constants in src/config.ts',
        },
        {
          selector: 'CallExpression[callee.property.name=/^(add|remove)EventListener$/] > Literal',
          message: 'Use DomEvent constant instead of a string literal for event names',
        },
        {
          selector: 'CallExpression[callee.property.name="createElement"] > Literal',
          message: 'Use HtmlTag constant instead of a string literal for element tag names',
        },
        {
          selector: 'AssignmentExpression[left.property.name="id"] > Literal',
          message: 'Use SectionId enum instead of a string literal when assigning element IDs',
        },
        {
          selector: 'CallExpression[callee.property.name=/^(getElementById|querySelector)$/] > Literal[raw=/^[\'\"]/]',
          message: 'Use a named constant (e.g. ROOT_ELEMENT_ID, HtmlTag) instead of a string literal in getElementById/querySelector',
        },
        {
          selector: 'CallExpression[callee.object.name="Object"][callee.property.name="defineProperty"] > Literal[raw=/^[\'\"]/]',
          message: 'Use a named constant instead of a string literal in Object.defineProperty',
        },
        {
          selector: 'CallExpression[callee.property.name="toBe"] > Literal[raw=/^[\'\"]/][value!=""]',
          message: 'String literals in toBe() must come from en.json or named constants in src/config.ts',
        },
        {
          selector: 'CallExpression[callee.property.name="toEqual"] > ArrayExpression > Literal[raw=/^[\'\"]/]',
          message: 'String literals in toEqual([...]) must come from named constants in src/config.ts',
        },
        {
          selector: 'Property[key.name="lng"] > Literal[raw=/^[\'\"]/]',
          message: 'Use a named language constant (e.g. UNSUPPORTED_LANG_CODE, DEFAULT_LANG) instead of a string literal for the lng option',
        },
        {
          selector: 'CallExpression[callee.property.name=/^(changeLanguage|addResourceBundle)$/] > Literal[raw=/^[\'\"]/]',
          message: 'Use a named language constant (e.g. TEST_LANG_FR, DEFAULT_LANG, I18N_TRANSLATION_NAMESPACE) instead of a string literal',
        },
        {
          selector: 'CallExpression[callee.name=/^(detectLang|isSupportedLang)$/] > Literal[raw=/^[\'\"]/][value!=""]',
          message: 'Use a named locale constant (e.g. TEST_LOCALE_EN_US, TEST_LANG_FR, UNSUPPORTED_LANG_CODE) instead of a string literal',
        },
        {
          selector: 'CallExpression[callee.property.name="replace"] > Literal[raw=/^[\'\"]/][value!=""][value!=/\\{\\{/]',
          message: 'String replacement values must be named constants in src/config.ts',
        },
        {
          selector: 'CallExpression[callee.property.name="split"] > Literal[raw=/^[\'\"]/]',
          message: 'Use a named constant instead of a string literal in split()',
        },
        {
          selector: 'CallExpression[callee.object.name="vi"][callee.property.name=/^(spyOn|stubGlobal)$/] > Literal',
          message: 'Use a named constant (e.g. WindowGlobal, I18N_CHANGE_LANGUAGE) instead of a string literal in vi.spyOn/vi.stubGlobal',
        },
        {
          selector: 'NewExpression[callee.name="RegExp"] > Literal[raw=/^[\'\"]/]',
          message: 'Use REGEX_FLAG_CASE_INSENSITIVE or other named constant instead of a string literal in RegExp',
        },
        {
          selector: 'ThrowStatement > NewExpression[callee.name="Error"] > Literal',
          message: 'Error messages must be named constants in src/config.ts',
        },
        {
          selector: 'TSUnknownKeyword',
          message: 'Avoid unknown — use a specific type such as LocaleValue, LocaleRecord, or a union instead',
        },
        {
          selector: 'CallExpression[callee.property.name="resolve"] > Literal[raw=/^[\'\"]/]',
          message: 'Use PUBLIC_DIR or another named constant instead of a string literal in resolve()',
        },
        {
          selector: 'CallExpression[callee.name="resolve"] > Literal[raw=/^[\'\"]/][value!=""]',
          message: 'Use a named constant (e.g. LOCALES_DIR_NAME, PUBLIC_DIR) instead of a string literal in resolve()',
        },
        {
          selector: 'BinaryExpression[left.type="UnaryExpression"][left.operator="typeof"] > Literal[raw=/^[\'\"]/]',
          message: 'Use a named constant (e.g. TYPEOF_OBJECT) instead of a string literal in typeof comparisons',
        },
        {
          selector: 'TemplateLiteral > Identifier[name="LOCALE_SEPARATOR"]',
          message: 'Use a pre-combined TEST_LOCALE_* constant instead of building locale tags with LOCALE_SEPARATOR in template literals',
        },
        {
          selector:
            'TemplateLiteral:not(TaggedTemplateExpression > TemplateLiteral) > TemplateElement[value.raw=/[a-zA-Z]{3,}/]',
          message:
            'Human-readable text in template literals must be named constants in src/config.ts',
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { sonarjs },
    rules: {
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-duplicated-branches': 'error',
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    files: ['src/**/*.stories.tsx'],
    rules: {
      // Meta and StoryObj must be imported from @storybook/react (the renderer) in Storybook v10
      'storybook/no-renderer-packages': 'off',
      // Story args must use data from en.json, not hardcoded object literals
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Property[key.name="args"] Property[key.name=/^(name|iconName|altText|imageUrl|title|role|description)$/] > Literal',
          message: 'Story args must use data from en.json (e.g. en.skillsData, en.projectsData) rather than hardcoded literals',
        },
      ],
    },
  },
];
