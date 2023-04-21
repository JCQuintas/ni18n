# Using useSyncLanguage to switch current language

Shows how to use `useSyncLanguage` into a regular `Next.js` project.
See example in the header component.

## Doc

`useSyncLanguage` can be used when not leveraging next.js' localized routes.
It will make sure to set the `current language` properly in `i18next` based
on the language parameter you pass to it.

Note that this can cause an error when rendering on the server. This happens
because `useTranslation` returns a Suspense. To fix it, either enable react
Suspense Mode, or set `react.useSuspense = false` in your `ni18n-options.ts`
