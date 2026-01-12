export const useEditProfile = () => {
  // Récupère le token et le profil admin
  const { token, admin } = useAuth() as { token: Ref<string | null>, admin: Ref<AdminData | null> }
  const config = useRuntimeConfig()
  const loading = ref(false) // État de chargement

  // Met à jour le profil admin
  const updateProfile = async (formData: Partial<AdminData>): Promise<boolean> => {
    loading.value = true

    try {
      const response = await $fetch<{ message: string, admin: AdminData }>(
        `${config.public.backendUrl}/api/v1/admin/edit`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token.value}` },
          body: formData,
        },
      )

      admin.value = response.admin // Met à jour l'état admin
      return true
    }
    catch {
      return false // Échec de la mise à jour
    }
    finally {
      loading.value = false
    }
  }

  return { updateProfile, loading }
}
