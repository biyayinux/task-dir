// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules
  modules: ['@nuxt/eslint'],

  // Outils de développement
  devtools: { enabled: true },

  // Compatibilité Nuxt 4
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',

  // Configuration ESLint
  eslint: {
    checker: true, // Affiche les erreurs ESLint pendant le développement
    config: {
      stylistic: true, // Active les règles de style du code
    },
  },
})
