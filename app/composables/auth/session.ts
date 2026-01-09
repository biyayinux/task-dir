import type { FetchError } from 'ofetch'

export const useAuthSession = () => {
  const meStore = useMeAdminStore()
  const othersStore = useOthersAdminStore()

  const logout = async () => {
    // Nettoyage des stores
    meStore.clearMeAdmin()
    if (othersStore.clearOthers) othersStore.clearOthers()

    // Nettoyage du storage
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }

    // Redirection
    return await navigateTo('/login')
  }

  // Cette fonction sera appelée dans tes autres composables
  const watchAuthError = (error: Ref<FetchError | null>) => {
    watch(error, async (newError) => {
      if (newError?.statusCode === 401 || newError?.statusCode === 403) {
        await logout()
      }
    })
  }

  return {
    logout,
    watchAuthError
  }
}
