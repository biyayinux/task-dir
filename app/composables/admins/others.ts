import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'

export const useOthersAdmins = () => {
  const othersStore = useOthersAdminStore()
  const { others } = storeToRefs(othersStore)
  const config = useRuntimeConfig()

  // Requête API avec cache (TanStack Query)
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['others_admins'],
    queryFn: async () => {
      const token = localStorage.getItem('auth_token')
      if (!token) throw new Error('No token found')

      return await $fetch<OtherAdmin[]>(
        `${config.public.backendUrl}/api/admin/others`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    },
    retry: false,
    enabled: !!(import.meta.client && localStorage.getItem('auth_token'))
  })

  // TanStack vers Pinia
  watch(
    data,
    (newData) => {
      if (newData) othersStore.setOthers(newData)
    },
    { immediate: true }
  )

  return {
    others,
    isLoading,
    fetchOthers: refetch,
    error
  }
}
