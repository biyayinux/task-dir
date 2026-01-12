import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // Modules
  modules: ['@nuxt/eslint', '@nuxt/icon'],

  // Configuration des auto-imports pour scanner les sous-dossiers
  imports: {
    dirs: ['composables/**'],
  },

  // Outils de développement
  devtools: { enabled: true },

  // Déclaration du fichier CSS global
  css: ['/assets/css/main.css'],

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL, // URL du backend exposée côté client
    },
  },

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
  // Configuration de Nuxt Icon
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
})
