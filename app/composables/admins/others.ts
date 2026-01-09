import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import type { FetchError } from 'ofetch'

export const useOthersAdmins = () => {
  const othersStore = useOthersAdminStore()
  const { others } = storeToRefs(othersStore)
  const config = useRuntimeConfig()
  const { logout, watchAuthError } = useAuthSession()

  // Récupère la liste des autres administrateurs
  const { data, isLoading, refetch, error } = useQuery<
    OtherAdmin[],
    FetchError
  >({
    queryKey: ['others_admins'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      return await $fetch<OtherAdmin[]>(
        `${config.public.backendUrl}/api/admin/others`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
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
      if (newData) othersStore.setOthers(newData)
    },
    { immediate: true }
  )

  return { others, isLoading, fetchOthers: refetch, logout }
}
