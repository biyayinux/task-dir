export const useEditAdmin = () => {
  const config = useRuntimeConfig()
  const { me, fetchProfile, logout } = useMe()
  const isLoading = ref(false)

  const updateProfile = async (formData: any) => {
    const token = localStorage.getItem('auth_token')
    isLoading.value = true

    try {
      const response = await $fetch(`${config.public.backendUrl}/admin/edit`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      // Rafraîchir les données du store global après modification
      await fetchProfile()

      // Redirection vers le profil
      await navigateTo(`/${me.value?.pseudo}`)
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
