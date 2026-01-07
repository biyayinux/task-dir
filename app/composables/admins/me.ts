import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'

export const useMe = () => {
  const meStore = useMeStore()
  const { me } = storeToRefs(meStore)
  const config = useRuntimeConfig()

  // Utilisation de TanStack Query pour gérer le cache
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) return null

      return await $fetch<any>(`${config.public.backendUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    // Ne s'exécute que côté client si un token existe
    enabled: import.meta.client && !!localStorage.getItem('auth_token')
  })

  // On synchronise Pinia quand TanStack reçoit de nouvelles données
  watch(
    data,
    (newData) => {
      if (newData) {
        meStore.setMe(newData)
      }
    },
    { immediate: true }
  )

  const logout = async (): Promise<void> => {
    meStore.clearMe()
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    await navigateTo('/login')
  }

  return {
    me,
    isLoading,
    fetchProfile: refetch, // Refetch permet de forcer la mise à jour si besoin
    logout
  }
}
