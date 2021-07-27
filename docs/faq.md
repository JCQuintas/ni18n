# F.A.Q.

### Ni18n config vs i18next config

The config schema used by `ni18n` is similar to the one used by `i18next`, but with slight differences listed below.

| property                  | value       | description                                                      |
| ------------------------- | ----------- | ---------------------------------------------------------------- |
| `use`                     | `undefined` | can be used to load `plugins` into `i18next`                     |
| `lng`                     | `undefined` | you can still pass it in, but it will be ignored                 |
| `partialBundledLanguages` | `true`      | you can set it to `false` if needed                              |
| `react.useSuspense`       | `false`     | will respect if you set it to `true` in case suspense is enabled |

### Changing the default translation files location

In order to change the location or schema of the files, simply pass the `backend.loadPath` option with the relative path to your files. You can use the placeholders `{{lng}}` and `{{ns}}` to replace the `language` and `namespace` respectively.

An example can be seen on the [custom-location](../examples/custom-location/ni18n.config.js). Where we use `./public/custom/{{lng}}.{{ns}}.json` to match files that reside in the same level regarding language and namespace.

### Using Plugins

To use a plugin you can take advantage of the `use` option on the config. It will accept an array of plugins, you can pass any value that `i18n.use()` also accepts. The plugins will then be added to the `i18n` instance we create. Remember to also add any configuration required by the plugins you are using.

You can check the [custom-backend](../examples/custom-backend/ni18n.config.js) example config where we use a HTTP backend to load the translation files instead of the default filesystem backend.

> Note: If you pass any `backend plugin` to the `use` option, the default filesystem backend will be `overwritten`.

### Loading translations on client side using HTTP/Other

Support for client loaded translations is baked in and should not require many changes from your side.

### Caching translations on the frontend

As show in the [cached-translations](../examples/cached-translations/ni18n.config.js), you can use the Chained backend to create a cache layer that will be used in case files were previously downloaded on a specific client.
