import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import type { FetchError } from 'ofetch'

// Structure des données de l'administrateur
export interface Me {
  id: number
  noms: string
  pseudo: string
  email: string
  role: string
  inscrit_le: string
}

export const useMeAdmin = () => {
  const meStore = useMeAdminStore()
  const { me } = storeToRefs(meStore)
  const config = useRuntimeConfig()

  // Récupération des données via TanStack Query
  const { data, isLoading, refetch, error } = useQuery<Me>({
    queryKey: ['me_admin'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) throw new Error('No token')

      return await $fetch<Me>(`${config.public.backendUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    retry: false,
    enabled: import.meta.client && !!localStorage.getItem('auth_token')
  })

  // Synchronisation avec le store Pinia
  watch(
    data,
    (newData) => {
      if (newData) meStore.setMeAdmin(newData)
    },
    { immediate: true }
  )

  // Redirection si le token est invalide ou expiré
  watch(error, async (newError: FetchError | null) => {
    if (newError?.statusCode === 401 || newError?.statusCode === 403) {
      await logout()
    }
  })

  // Nettoyage de la session et redirection
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
