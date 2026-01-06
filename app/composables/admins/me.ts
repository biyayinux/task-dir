import { storeToRefs } from 'pinia'

export const useMe = () => {
  const meStore = useMeStore()
  const { me } = storeToRefs(meStore)
  const config = useRuntimeConfig()

  // Récupération du profil admin
  const fetchProfile = async (): Promise<void> => {
    // Vérification côté client uniquement
    if (import.meta.server) return

    const token = localStorage.getItem('auth_token')
    if (!token) {
      await navigateTo('/login')
      return
    }

    try {
      const data = await $fetch<any>(`${config.public.backendUrl}/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Mise à jour globale du profil
      meStore.setMe(data)
    } catch (error) {
      console.error('Erreur de session:', error)
      await logout()
    }
  }

  // Suppression de la session
  const logout = async (): Promise<void> => {
    meStore.clearMe()
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    await navigateTo('/login')
  }

  return {
    me,
    fetchProfile,
    logout
  }
}
