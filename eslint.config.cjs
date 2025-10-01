const tseslint = require('typescript-eslint');

module.exports = [
  {
    files: [
      'src/**/*.{ts,cts,mts}',
      'test/**/*.{ts,cts,mts}'
    ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest'
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      ...tseslint.configs.recommended[1].rules
    }
  }
];
