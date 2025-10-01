import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import astro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default defineConfig([
	js.configs.recommended,
	tseslint.configs.strict,

	astro.configs.recommended,
	astro.configs['jsx-a11y-strict'],
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},

	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
		},
	},

	{
		ignores: ['.astro/', 'dist/'],
	},
])
