import {
  VueQueryPlugin,
  QueryClient,
  dehydrate,
  hydrate
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  // Création du client avec un cache de 5 minutes
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5
      }
    }
  })

  // Installation du plugin dans l'application Nuxt
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  // Capture l'état du cache pour l'envoyer au navigateur
  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient)
    })
  }

  // Réutilise les données reçues du serveur (évite le double fetch)
  if (import.meta.client) {
    hydrate(queryClient, nuxtApp.payload.vueQueryState)
  }
})
