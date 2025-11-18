
export default [
  {
    // Ваши правила и настройки
    rules: {
      'no-param-reassign': ['error', { props: false }],
      'class-methods-use-this': 'off',
      'no-restricted-syntax': ['error', 'WithStatement'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-console': 'off'
    },

    // Игнорируемые файлы/папки (именно "ignores", а не "ignorePatterns")
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'test/**',
      '.nyc_output/**'
    ]
  }
];