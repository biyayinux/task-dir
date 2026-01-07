import {
  VueQueryPlugin,
  QueryClient,
  dehydrate,
  hydrate
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5 // Les données sont considérées 'neuves' pendant 5 minutes
      }
    }
  })

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, nuxtApp.payload.vueQueryState)
  }
})
