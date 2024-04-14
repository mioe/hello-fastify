import js from '@eslint/js'

export default [
	js.configs.recommended,

	{
		rules: {
			'comma-dangle': ['error', 'always-multiline'],
			'no-return-await': 'off',
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'quote-props': ['error', 'as-needed'],
			'space-before-function-paren': ['error', 'never'],
			indent: ['error', 'tab'],
			quotes: ['error', 'single'],
			semi: ['error', 'never'],
		},
	},
]
