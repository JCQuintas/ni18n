# Ni18n

Is an easy to use integration for [Next.js](https://nextjs.org/) to enable [i18next](https://www.i18next.com/) translations on your application with support for SSR and SSG.

<img src="./assets/logo.svg" />

It gives you freedom to use `i18next` with a lot of different customizations, while still being compatible with `next.js`.

`Ni18n` also does not directly depend on `i18next` nor `react-i18next`, allowing you to update these dependencies without having to wait for any action on our part.

- [Installing](#installing)
- [Usage](#usage)
- [Examples](#Examples)
- [F.A.Q.](#f.a.q.)

## Installing

```shell
yarn add i18next react-i18next ni18n
```

```shell
npm install i18next react-i18next ni18n
```

## Usage

There are only a few simple steps necessary to have you going.

1. [Create next.js config](#create-next.js-config)
2. [Create ni18n config](#create-ni18n-config)
3. [Create \_app](#create-_app)
4. [Use loadTranslations in your page](#use-loadtranslations-in-your-page)
5. [Translation files](#translation-files)

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

Finally, you just need to create your translation files on the `public` folder. The default structure is `/public/locales/{{lng}}/{{ns}}.json`, but it can be changed following the instructions [here](#changing-the-default-translation-files-location)

```
./public
└── locales
    ├── en
    │   ├── namespace1.json
    │   └── namespace2.json
    └── es
        ├── namespace1.json
        └── namespace2.json
```

## Examples

There are a few ready made projects that you can find in the [examples folder]('./examples). They should cover most of the common use cases and issues you can find while setting up your project with `ni18n`. If you feel like there is anything missing, please submit a PR so we can always improve and add more use cases.

- [Simple](./examples/simple)
- [Typescript](./examples/typescript)
- [Custom Backend](./examples/custom-backend)
- [Custom Language Selection](./examples/custom-language-selection)
- [Custom Translation Files Location](./examples/custom-location)

## F.A.Q.

### Ni18n config vs i18next config

The config schema used by `ni18n` is similar to the one used by `i18next`, but with slight differences listed below.

| property            | behavior          | value                                                                    | description                                  |
| ------------------- | ----------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| `initImmediate`     | ignored           | <div><div>browser: `true`</div><div>server: `false`</div></div>          | controlled so `ni18n` works                  |
| `react.useSuspense` | ignored on server | <div><div>browser: `input \| true`</div><div>server: `false`</div></div> | input will be respected when in browser      |
| `use`               | ni18n only        | `undefined`                                                              | can be used to load `plugins` into `i18next` |

### Changing the default translation files location

### Using Plugins
