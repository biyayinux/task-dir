import type { FetchError } from 'ofetch'

export const useEditProfile = () => {
  // Token et profil admin
  const { token, admin } = useAuth() as {
    token: Ref<string | null>
    admin: Ref<AdminData | null>
  }

  const config = useRuntimeConfig()
  const loading = ref(false)

  const updateProfile = async (
    formData: Partial<AdminData>,
  ): Promise<boolean> => {
    loading.value = true

    try {
      // Requête de mise à jour du profil
      const response = await $fetch<{ message: string, admin: AdminData }>(
        `${config.public.backendUrl}/api/v1/admin/edit`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token.value}` },
          body: formData,
        },
      )

      // Mise à jour du store local
      admin.value = response.admin
      return true
    }
    catch (err) {
      const fetchError = err as FetchError<{ error: string }>

      // Affiche la page d’erreur globale
      throw showError({
        statusCode: fetchError.statusCode,
        statusMessage: fetchError.data?.error,
        fatal: true,
      })
    }
    finally {
      // Fin du chargement
      loading.value = false
    }
  }

  return { updateProfile, loading }
}
