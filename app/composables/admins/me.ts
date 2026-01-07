import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'

export const useMeAdmin = () => {
  const meStore = useMeAdminStore()
  const { me } = storeToRefs(meStore)
  const config = useRuntimeConfig()

  // Gestion du cache et de la requête avec TanStack Query
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['me_admin'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) return null

      return await $fetch<any>(`${config.public.backendUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    // Activer uniquement côté client avec un token présent
    enabled: import.meta.client && !!localStorage.getItem('auth_token'),
    // Pas de tentative supplémentaire en cas d'échec (401/403)
    retry: false
  })

  // Synchroniser les données reçues avec le store Pinia
  watch(
    data,
    (newData) => {
      if (newData) meStore.setMeAdmin(newData)
    },
    { immediate: true }
  )

  // Rediriger vers login si le token est expiré ou invalide
  watch(error, async (newError: any) => {
    if (newError?.status === 401 || newError?.status === 403) {
      await logout()
    }
  })

  // Nettoyage complet de la session
  const logout = async (): Promise<void> => {
    meStore.clearMeAdmin()
    if (import.meta.client) localStorage.removeItem('auth_token')
    await navigateTo('/login')
  }

  return {
    me,
    isLoading,
    fetchProfile: refetch,
    logout
  }
}
