# Custom Language Selection Example

This example shows how you can use this package without using the [Next.js's i18n routing](https://nextjs.org/docs/advanced-features/i18n-routing). This means you will have to deal with detecting and selecting the user's preferred language yourself.

> Note: This also means the page will ship with translations for `all` the supported languages, but contained to the needed `namespaces` requested by `loadTranslations`.
