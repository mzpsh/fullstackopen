module.exports = {
  root: true,
  env: { browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module'},
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@stylistic/js', '@stylistic/jsx'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    '@stylistic/js/indent': ['warn', 2],
    '@stylistic/js/object-curly-spacing': ['warn', 'always'],
    '@stylistic/js/comma-spacing': ['warn'],
    "@stylistic/jsx/jsx-equals-spacing": [2, "always"],
    "@stylistic/jsx/jsx-max-props-per-line": [1, {'maximum': 1}],
    // '@stylistic/jsx/jsx-props-no-multi-spaces': ['warn']
  },
}
