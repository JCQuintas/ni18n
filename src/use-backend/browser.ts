import type { i18n as I18NextClient } from 'i18next'
// import HttpBackend from 'i18next-http-backend'

export default (i18n: I18NextClient): I18NextClient => i18n

// export default (i18n: I18NextClient): I18NextClient => {
//   const hasCustomBackend = i18n.modules.backend
//   if (!hasCustomBackend) {
//     i18n.use(HttpBackend)
//   }
//   return i18n
// }
