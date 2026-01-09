import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import type { FetchError } from 'ofetch'

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
  const { logout, watchAuthError } = useAuthSession()

  // Récupère le profil admin connecté
  const { data, isLoading, refetch, error } = useQuery<Me, FetchError>({
    queryKey: ['me_admin'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      return await $fetch<Me>(`${config.public.backendUrl}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    retry: false,
    enabled: !!(import.meta.client && localStorage.getItem('auth_token'))
  })

  // Vérifie si la session expire (401/403)
  watchAuthError(error as Ref<FetchError | null>)

  // Met à jour Pinia quand les données arrivent
  watch(
    data,
    (newData) => {
      if (newData) meStore.setMeAdmin(newData)
    },
    { immediate: true }
  )

  return { me, isLoading, fetchProfile: refetch, logout }
}
