# Ni18n

Is an easy to use integration for [Next.js](https://nextjs.org/) to enable [i18next](https://www.i18next.com/) translations on your application with support for SSR, SSG and Client translation loading.

<img height="150px" width="300px" src="./.github/assets/logo.svg" />

It gives you freedom to use `i18next` with a lot of different customizations, while still being compatible with `next.js`.

`Ni18n` also does not directly depend on `i18next` nor `react-i18next`, allowing you to update these dependencies without having to wait for any action on our part.

- [Installing](#installing)
- [Getting Started](./docs/usage/getting-started.md)
- [Examples](./docs/examples.md)
- [F.A.Q.](./docs/faq.md)

## Installing

```bash
yarn add i18next react-i18next ni18n
```

```bash
npm install i18next react-i18next ni18n
```

```typescript
import {
  appWithI18Next,
  loadTranslations,
  clientNamespaces,
  useSyncLanguage,
} from 'ni18n'
```

## Getting Started

Read the docs at [Getting Started](./docs/usage/getting-started.md) or on the website [https://jcquintas.gitbook.io/ni18n/usage/getting-started](https://jcquintas.gitbook.io/ni18n/usage/getting-started)

## Known Issues

When running on Vercel we are unable to load the translation files automatically because the [vercel/nft](https://github.com/vercel/nft) package doesn't bundle files requested by a third party lib.

A work around is to create a wrapper around `loadTranslations` that calls `path.resolve('./', './public/locales')`, and then use this function instead of the exported by the `ni18n` package.

```typescript
import { loadTranslations as ni18nLoadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

export const loadTranslations = async (
  initialLocale?: string | undefined,
  namespacesNeeded?: NamespacesNeeded | undefined,
) => {
  const locales = path.resolve('./', './public/locales')

  return await ni18nLoadTranslations(
    ni18nConfig,
    initialLocale,
    namespacesNeeded,
  )
}
```

You can read more on [#49](https://github.com/JCQuintas/ni18n/issues/49)
