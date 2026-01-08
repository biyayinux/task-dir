export const useEditAdmin = () => {
  const config = useRuntimeConfig()
  const meStore = useMeAdminStore()

  // Récupération de la session et des outils depuis useMeAdmin
  const { me, logout, fetchProfile } = useMeAdmin()
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

      // Mise à jour immédiate du store Pinia
      const updatedMeAdmin = response.admin || response
      meStore.setMeAdmin(updatedMeAdmin)

      // Redirection vers le nouveau pseudo
      await navigateTo(`/${updatedMeAdmin.pseudo}`)
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
    logout,
    fetchProfile // Permet de rafraîchir manuellement
  }
}
