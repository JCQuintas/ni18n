# Getting Started

There are two configuration files that are necessary for `ni18n` to work as expected in most cases. The `nextjs.config.js` and a file to hold `ni18n`'s own configuration. Then you will need the translations files for your application and to setup your `pages/_app` file accordingly in order to be able to use the translations in your application.

## 1. Next.js config

Setup the next config file according to your needs by following the documentation on [next.js i18n-routing](https://nextjs.org/docs/advanced-features/i18n-routing)

```javascript
// next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
}
```

## 2. Ni18n config

The `ni18n` config works pretty much as an `i18next` config does. With a few minor differences [listed in the F.A.Q.](../faq.md#ni18n-config-vs-i18next-config).

But the basic setup is pretty simple.

```typescript
// ni18n.config.ts
import type { Ni18nOptions } from 'ni18n'

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: ['en', 'es'],
  ns: ['your-namespaces'],
}
```

> Note: The `name` and `location` of the file don't really matter, you can call it anything and put it anywhere you want.

## 3. Translation Files

You will also need to provide the translation files for your application. They are expected to be on the `public` folder. The default structure is `/public/locales/{{lng}}/{{ns}}.json`, but it can be changed following the instructions [here](../faq.md#changing-the-default-translation-files-location)

Example of how your folder structure should look like.

```
./public
└── locales
    ├── language1
    │   ├── namespace1.json
    │   └── namespace2.json
    └── language2
        ├── namespace1.json
        └── namespace2.json
```

## 4. Next.js App

Translations won't work without a `I18nextProvider`, so we need to set it up. It is required to wrap your `App` with the `appWithI18Next` function provided by `ni18n`. Which will initialize the `i18next` instance and provide it as a context for all the children. You can read more about [Next.js Custom App](https://nextjs.org/docs/advanced-features/custom-app) in their documentation.

```typescript
// pages/_app.tsx
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, ni18nConfig)
```

## 5. Using Translations

Finally, you can call `useTranslation` on your files, or any other `react-i18next` component you may need.

```jsx
// my-component.tsx
import { useTranslation } from 'react-i18next'

export const MyComponent = () => {
  const { t } = useTranslation()
  return <>{t('myKey')}</>
}
```

## Caveats

### Client Side vs Server Side

At this point, **all your translation files** will be loaded on the client side, if you need them loaded on the server, read more on [Server Side Loading](./server-side-loading.md)

We also recommend to always use either [loadTranslations](./server-side-loading.md) or [clientNamespaces](./client-side-loading.md) or both in a page, else you will load all the namespaces on your application for every page.

### Importing

`ni18n` only exports `appWithI18Next`, `loadTranslations`, `clientNamespaces` and `useSyncLanguage`. All other functions you need can be imported from `react-i18next` or `i18next` directly.
