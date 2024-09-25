// @ts-check
// See https://typescript-eslint.io/packages/typescript-eslint#usage

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const allGlob = '**/*.{js,jsx,ts,tsx}';
const defaultProjectFiles = [
  'eslint.config.js',
];
const ignoreCoverageGlob = 'coverage/**/*';
const ignoreBuildGlob = 'dist/**/*';


export default tseslint.config(
  {
    ignores: [ignoreBuildGlob, ignoreCoverageGlob]
  },
  {
    files: [allGlob]
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Global ESLint Settings
  {
    languageOptions: {
      globals: globals.es2024,
      parserOptions: {
        projectService: {
          allowDefaultProject: defaultProjectFiles,
          defaultProject: './tsconfig.json'
        },
        tsconfigRootDir: import.meta.dirname
      }
    }
  },

  // Additional ESLint Rules
  {
    rules: {
      'no-debugger': 'warn',
      'no-param-reassign': ['warn', {props: true}],
      'object-shorthand': 'warn',
      'prefer-template': 'warn'
    }
  },

  // Additional Typescript ESLint Rules
  {
    rules: {
      '@typescript-eslint/array-type': ['warn', {default: 'array-simple'}],
      '@typescript-eslint/consistent-type-imports': ['warn', {fixStyle: 'inline-type-imports'}],
      '@typescript-eslint/no-explicit-any': 'off', // any can be used, but sparingly and for the right reasons
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-redeclare': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {args: 'none', ignoreRestSiblings: true}],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      '@typescript-eslint/no-use-before-define': [
        'warn',
        {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false
        }
      ],
      '@typescript-eslint/no-useless-constructor': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/return-await': 'warn',
      '@typescript-eslint/unbound-method': 'off'
    }
  },

  // Prettier
  eslintConfigPrettier,
  {
    rules: {
      curly: 'warn' // Turn curly back on for stylistic consistency
    }
  }
);
