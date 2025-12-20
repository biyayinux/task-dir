import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./assets/styles/default.css'],
  vite: {
    plugins: [tailwindcss()]
  }
})
