# Ni18n

Is an easy to use integration for [Next.js](https://nextjs.org/) to enable [i18next](https://www.i18next.com/) translations on your application with support for SSR, SSG and Client translation loading.

<img src="./.github/assets/logo.svg" />

It gives you freedom to use `i18next` with a lot of different customizations, while still being compatible with `next.js`.

`Ni18n` also does not directly depend on `i18next` nor `react-i18next`, allowing you to update these dependencies without having to wait for any action on our part.

- [Installing](#installing)
- [Usage](#usage)
- [Examples](#examples)
- [F.A.Q.](#faq)

## Installing

```shell
yarn add i18next react-i18next ni18n
```

```shell
npm install i18next react-i18next ni18n
```

## Usage

There are only a few simple steps necessary to have you going.

### 1. Create Next.js config

Setup the next config file according to your needs by following the documentation on [next.js i18n-routing](https://nextjs.org/docs/advanced-features/i18n-routing)

```js
// next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
}
```

### 2. Create Ni18n config

The `ni18n` config works pretty much as an `i18next` config does. With a few minor differences [listed below](#ni18n-config-vs-i18next-config).

But the basic setup is pretty simple.

```ts
// ni18n.config.ts
import type { Ni18nOptions } from 'ni18n'

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: ['en', 'es'],
  ns: ['your-namespaces'],
}
```

> Note: The `name` and `location` of the file don't really matter, you can call it anything and put it anywhere you want.

### 3. Create \_app

In order to initialize the `I18nextProvider`, you will need to wrap your `App` with the `appWithI18Next` function provided by `ni18n`.

```tsx
// _app.tsx
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, ni18nConfig)
```

### 4. Use `loadTranslations` in your page

To provide translations to your pages during Static Generation (SSG) or Server Side Rendering (SSR) you will need to use the `loadTranslations` function provided by `ni18n` in either your `getStaticProps` or `getServerSideProps`.

> Note: skip this step if you want to load your translations on the client only.

```tsx
// pages/index.ts

// Can be used with `getServerSideProps` as well
export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'your-namespaces',
      ])),
    },
  }
}
```

### 5. Translation files

As for the files, you just need to create them on the `public` folder. The default structure is `/public/locales/{{lng}}/{{ns}}.json`, but it can be changed following the instructions [here](#changing-the-default-translation-files-location)

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

### 6. useTranslation

Finally, you can call `useTranslation` on your files, or any other `react-i18next` component you may need.

```tsx
// my-component.tsx
import { useTranslation } from 'react-i18next'

export const MyComponent = () => {
  const { t } = useTranslation()
  return <>{t('myKey')}</>
}
```

> Note: `ni18n` only exports `appWithI18Next`, `loadTranslations`, `clientNamespaces` and `useSyncLanguage`. All other functions you need can be imported from `react-i18next`.

## Examples

There are a few ready made projects that you can find in the [examples folder](./examples). They should cover some of the common use cases and issues you can find while setting up your project with `ni18n`. If you feel like there is anything missing, please submit a PR so we can always improve and add more use cases.

- [Simple](./examples/simple)
- [Typescript](./examples/typescript)
- [Custom Backend](./examples/custom-backend)
- [Custom Language Selection](./examples/custom-language-selection)
- [Custom Translation Files Location](./examples/custom-location)
- [Cached Translations](./examples/cached-translations)

## F.A.Q.

### Ni18n config vs i18next config

The config schema used by `ni18n` is similar to the one used by `i18next`, but with slight differences listed below.

| property | value       | description                                  |
| -------- | ----------- | -------------------------------------------- |
| `use`    | `undefined` | can be used to load `plugins` into `i18next` |

### Changing the default translation files location

In order to change the location or schema of the files, simply pass the `backend.loadPath` option with the relative path to your files. You can use the placeholders `{{lng}}` and `{{ns}}` to replace the `language` and `namespace` respectively.

An example can be seen on the [custom-location](./examples/custom-location/ni18n.config.js). Where we use `./public/custom/{{lng}}.{{ns}}.json` to match files that reside in the same level regarding language and namespace.

### Using Plugins

To use a plugin you can take advantage of the `use` option on the config. It will accept an array of plugins, you can pass any value that `i18n.use()` also accepts. The plugins will then be added to the `i18n` instance we create. Remember to also add any configuration required by the plugins you are using.

You can check the [custom-backend](examples/custom-backend/ni18n.config.js) example config where we use a HTTP backend to load the translation files instead of the default filesystem backend.

> Note: If you pass any `backend plugin` to the `use` option, the default filesystem backend will be `overwritten`.

### Loading translations on client side using HTTP/Other

Support for client loaded translations is baked in and should not require many changes from your side.

### Caching translations on the frontend

As show in the [cached-translations](examples/cached-translations/ni18n.config.js), you can use the Chained backend to create a cache layer that will be used in case files were previously downloaded on a specific client.
