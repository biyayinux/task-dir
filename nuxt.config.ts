import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Active les fonctionnalités et la structure de dossier Nuxt 4
  future: {
    compatibilityVersion: 4
  },
  // Configuration des auto-imports pour scanner les sous-dossiers
  imports: {
    dirs: ['composables/**']
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL
    }
  },

  css: ['./assets/styles/default.css'],
  vite: {
    build: {
      sourcemap: false // Désactive la génération des sourcemaps
    },
    plugins: [tailwindcss()]
  },

  modules: ['nuxt-lucide-icons', '@nuxtjs/color-mode', '@pinia/nuxt'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  }
})
