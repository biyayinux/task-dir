// Définition des champs modifiables du profil
interface UpdateAdminPayload {
  noms?: string
  pseudo?: string
  email?: string
}

export const useEditAdmin = () => {
  const config = useRuntimeConfig()
  const meStore = useMeAdminStore()

  // Récupération de la session existante
  const { me, logout, fetchProfile } = useMeAdmin()
  const isLoading = ref(false)

  // Mise à jour du profil avec des données typées
  const updateProfile = async (formData: UpdateAdminPayload) => {
    const token = localStorage.getItem('auth_token')
    isLoading.value = true

    try {
      // Envoi des modifications (On attend un objet de type Me en retour)
      const response = await $fetch<{ admin: Me } | Me>(
        `${config.public.backendUrl}/api/admin/edit`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        }
      )

      // Extraction des données mises à jour
      const updatedMeAdmin = 'admin' in response ? response.admin : response

      // Mise à jour du store et redirection
      meStore.setMeAdmin(updatedMeAdmin)
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
    fetchProfile
  }
}
