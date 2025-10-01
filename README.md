# Astro ESLint Setup

Set up ESLint automatically to lint Astro files with TypeScript syntax.

```bash
npx astro-eslint-setup
```

## Dependencies that this executable installs

- `eslint`
- `@eslint/js` for recommended JavaScript rules
- `eslint-plugin-astro` for Astro syntax linting
- `eslint-plugin-jsx-a11y` for accessibility checks
- `typescript-eslint` for strict TypeScript rules and to extend Astro plugin parser for TypeScript syntax detection

## Configuration File Generated

```js
import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import { defineConfig } from 'eslint/config'
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
```

For more info, refer to the [ESLint Plugin Astro docs](https://ota-meshi.github.io/eslint-plugin-astro/)

### Opinionated Rules

- `'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],`

Sometimes you want to ignore an argument in a callback. For example:

```ts
array.filter(([_, value]) => value !== '')
```
