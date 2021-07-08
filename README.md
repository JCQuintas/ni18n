# Ni18n

Is an easy to use integration for [Next.js](https://nextjs.org/) to enable [i18next](https://www.i18next.com/) translations on your application with support for SSR and SSG.

<img src="./.github/assets/logo.svg" />

It gives you freedom to use `i18next` with a lot of different customizations, while still being compatible with `next.js`.

`Ni18n` also does not directly depend on `i18next` nor `react-i18next`, allowing you to update these dependencies without having to wait for any action on our part.

- [Installing](#installing)
- [Usage](#usage)
- [Examples](#Examples)
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

1. [Create next.js config](#create-nextjs-config)
2. [Create ni18n config](#create-ni18n-config)
3. [Create \_app](#create-_app)
4. [Use loadTranslations in your page](#use-loadtranslations-in-your-page)
5. [Translation files](#translation-files)
6. [useTranslation](#usetranslation)

### Create Next.js config

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

### Create Ni18n config

The `ni18n` config works pretty much as an `i18next` config does. With a few minor differences [listed below](#ni18n-config-vs-i18next-config).

But the basic setup is pretty simple.

```ts
// ni18n.config.ts
import { Ni18nOptions } from 'ni18n'

export const ni18nConfig: Ni18nOptions = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
  ns: ['your-namespaces'],
}
```

> Note: The `name` and `location` of the file don't really matter, you can call it anything and put it anywhere you want.

### Create \_app

In order to initialize the `I18nextProvider`, you will need to wrap your `App` with the `appWithI18Next` function provided by `ni18n`.

```tsx
// _app.tsx
import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithI18Next(MyApp, ni18nConfig)
```

### Use `loadTranslations` in your page

To provide translations to your pages during Static Generation (SSG) or Server Side Rendering (SSR) you will need to use the `loadTranslations` function provided by `ni18n` in either your `getStaticProps` or `getServerSideProps`.

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

### Translation files

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

### useTranslation

Finally, you can call `useTranslation` on your files, or any other `react-i18next` component you may need.

```tsx
// my-component.tsx
import { useTranslation } from 'react-i18next'

export const MyComponent = () => {
  const { t } = useTranslation()
  return <>{t('myKey')}</>
}
```

> Note: `ni18n` only exports `appWithI18Next`, `loadTranslations` and `useSyncLanguage`. All other functions you need can be imported from `react-i18next`.

## Examples

There are a few ready made projects that you can find in the [examples folder](./examples). They should cover most of the common use cases and issues you can find while setting up your project with `ni18n`. If you feel like there is anything missing, please submit a PR so we can always improve and add more use cases.

- [Simple](./examples/simple)
- [Typescript](./examples/typescript)
- [Custom Backend](./examples/custom-backend)
- [Custom Language Selection](./examples/custom-language-selection)
- [Custom Translation Files Location](./examples/custom-location)
- [Client HTTP Translations](./examples/client-http-translations)

## F.A.Q.

### Ni18n config vs i18next config

The config schema used by `ni18n` is similar to the one used by `i18next`, but with slight differences listed below.

| property            | behavior          | value                                                                                              | description                                         |
| ------------------- | ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `initImmediate`     | ignored           | <div><div>browser: `true`</div><div>server: `false`</div></div>                                    | controlled so `ni18n` works                         |
| `preload`           | ignored on server | <div><div>browser: `input \| supportedLngs`</div><div>server: `false \| supportedLngs`</div></div> | server behavior depends on `loadTranslations` input |
| `react.useSuspense` | ignored on server | <div><div>browser: `input`</div><div>server: `false`</div></div>                                   | input will be respected when in browser             |
| `use`               | ni18n only        | `undefined`                                                                                        | can be used to load `plugins` into `i18next`        |

### Changing the default translation files location

In order to change the location or schema of the files, simply pass the `backend.loadPath` option with the relative path to your files. You can use the placeholders `{{lng}}` and `{{ns}}` to replace the `language` and `namespace` respectively.

An example can be seen on the [custom-location](./examples/custom-location/ni18n.config.js). Where we use `./public/custom/{{lng}}.{{ns}}.json` to match files that reside in the same level regarding language and namespace.

### Using Plugins

To use a plugin you can take advantage of the `use` option on the config. It will accept an array of plugins, you can pass any value that `i18n.use()` also accepts. The plugins will then be added to the `i18n` instance we create. Remember to also add any configuration required by the plugins you are using.

You can check the [custom-backend](examples/custom-backend/ni18n.config.js) example config where we use a HTTP backend to load the translation files instead of the default filesystem backend.

> Note: If you pass any `backend plugin` to the `use` option, the default filesystem backend will be `overwritten`.

### Loading translations on client side using HTTP/Other

Support for client loaded translations is baked in and should not require many changes from your side. As show in the [client-http-translations](examples/client-http-translations/ni18n.config.js), simply add a backend plugin, and set the options `partialBundledLanguages` and `preload`. Then you can have a page that doesn't have `getStaticProps` nor `getServerSideProps`.

But remember you will need to check for the `ready` variable in `const { t, ready } = useTranslation('client')` before using `t`, or you might get an error.
