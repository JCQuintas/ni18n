# Client Side Loading

All the namespaces are always loaded on the client side if no [loadTranslations](./server-side-loading.md) or `clientNamespaces` are called on a page's server callback. In order to prevent that, you can use `clientNamespaces` to only allow the client to load the specific namespaces given to the function.

```tsx
// pages/index.ts

export const getStaticProps = async (props) => {
  return {
    props: {
      ...clientNamespaces(['client-namespace']),
    },
  }
}
```

You can use both [loadTranslations](./server-side-loading.md) or `clientNamespaces` in the same page if necessary.

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
