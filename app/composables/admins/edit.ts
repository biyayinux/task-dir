export const useEditAdmin = () => {
  const config = useRuntimeConfig()
  const meStore = useMeStore() // On accède directement au store pour le modifier
  const { me, logout } = useMe()
  const isLoading = ref(false)

  const updateProfile = async (formData: any) => {
    const token = localStorage.getItem('auth_token')
    isLoading.value = true

    try {
      // Envoi des modifications au serveur
      const response = await $fetch<any>(
        `${config.public.backendUrl}/api/admin/edit`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        }
      )

      // Mise à jour manuelle du store sans recharger (Refresh)
      const updatedAdmin = response.admin || response
      meStore.setMe(updatedAdmin)

      // Redirection vers le profil avec les nouvelles données déjà présentes
      await navigateTo(`/${updatedAdmin.pseudo}`)
    } catch (error) {
      console.error('Erreur de mise à jour:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    me,
    isLoading,
    updateProfile,
    logout
  }
}
