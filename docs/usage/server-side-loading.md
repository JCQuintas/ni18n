# Server Side Loading

To provide translations to your pages during Static Generation (SSG) or Server Side Rendering (SSR) you will need to use the `loadTranslations` function provided by `ni18n` in either your `getStaticProps` or `getServerSideProps`.

```tsx
// pages/index.ts

// Can be used with `getServerSideProps` as well
export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'server-namespace',
      ])),
    },
  }
}
```

This will render the pages with the translations in the `namespaces` provided, and also generate `json` data to be used when `rehydrating` the page in different languages.

Namespaces not provided will **not be loaded on the client** if `loadTranslations` is provided to a page. You can use both `loadTranslations` and [clientNamespaces](./client-side-loading.md) in the same page if it is necessary to load some translations only in the client.

```tsx
// pages/index.ts

export const getStaticProps = async (props) => {
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, props.locale, [
        'server-namespace',
      ])),
      ...clientNamespaces(['client-namespace']),
    },
  }
}
```
