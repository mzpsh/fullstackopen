import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['warn', 2],
      '@stylistic/js/object-curly-spacing': ['warn', 'always'],
      '@stylistic/js/comma-spacing': ['warn']
      // '@stylistic/js/comma-spacing': ['warn', { 'before': true, 'after': false }]
    }
  }
];