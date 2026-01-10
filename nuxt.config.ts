import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // Modules
  modules: ['@nuxt/eslint'],

  // Outils de développement
  devtools: { enabled: true },

  // Déclaration du fichier CSS global
  css: ['/assets/css/main.css'],

  // Compatibilité Nuxt 4
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',

  // Plugin Tailwind pour Vite
  vite: {
    build: {
      sourcemap: false, // Désactive la génération des sourcemaps
    },
    plugins: [
      tailwindcss(),
    ],
  },

  // Configuration ESLint
  eslint: {
    checker: true, // Affiche les erreurs ESLint pendant le développement
    config: {
      stylistic: true, // Active les règles de style du code
    },
  },
})
