import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'

const compat = new FlatCompat({
  baseDirectory: path.dirname(import.meta.url),
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: ['prettier', 'jsx-a11y', 'simple-import-sort', 'import'],
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'import/order': [
        'error',
        { groups: [['builtin', 'external', 'internal']] },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }),
]

export default eslintConfig
