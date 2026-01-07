import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'

export const useMeAdmin = () => {
  const meStore = useMeAdminStore()
  const { me } = storeToRefs(meStore)
  const config = useRuntimeConfig()

  // Configuration de TanStack Query
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['me_admin'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) throw new Error('No token')

      return await $fetch<any>(`${config.public.backendUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },

    // Désactivation du retry pour les erreurs 401 et 403
    retry: false,
    enabled: import.meta.client && !!localStorage.getItem('auth_token')
  })

  // Synchronisation des données avec le store Pinia
  watch(
    data,
    (newData) => {
      if (newData) meStore.setMeAdmin(newData)
    },
    { immediate: true }
  )

  // Gestion des erreurs d’authentification (token expiré)
  watch(error, async (newError: any) => {
    if (newError?.status === 401 || newError?.status === 403) {
      await logout()
    }
  })

  // Fonction de déconnexion de l’administrateur
  const logout = async () => {
    meStore.clearMeAdmin()
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    return navigateTo('/login')
  }

  return {
    me,
    isLoading,
    fetchProfile: refetch,
    logout
  }
}
