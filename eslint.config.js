import eslint from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-extended/base';

export default [
  // Применяем стандартные правила ESLint
  eslint.configs.recommended,

  // Применяем правила Airbnb (это массив, который мы "разворачиваем" оператором ...)
  ...airbnbBase,

    {
    // Эти правила будут объединены с предыдущими и перезапишут правила Airbnb, если нужно.
    rules: {
      "no-param-reassign": ["error", { "props": false }],
      "class-methods-use-this": "off",
      "no-restricted-syntax": ["error", "WithStatement"],
      "quotes": ["error", "single", { "allowTemplateLiterals": true }],
      "no-console": "off"
    }
  },

  // Добавляем игнорируемые файлы
  {
    ignores: [
      "node_modules", 
      "dist", 
      "build",
      "coverage",
      "test",
      ".nyc_output"
    ]
  }, 
];

