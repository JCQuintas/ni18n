# Typescript Example

`ni18n` ships with its own types and leverages the types from `react-i18next`.

> Note: For a detailed instruction on creating your declaration file, [read react-i18next docs](https://react.i18next.com/latest/typescript)

To allow a type safe integration you can create a new declaration file as seen in [i18next.d.ts](./i18next.d.ts). Then make sure the file is loaded in your `tsconfig.json` under `include`.

Then your `t`, `useTranslation`, `loadTranslations` and other functions will be properly typed and offer autocomplete.
