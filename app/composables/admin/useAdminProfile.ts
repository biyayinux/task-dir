import type { FetchError } from 'ofetch'

// Données du profil administrateur
export interface AdminData {
  noms: string
  pseudo: string
  description: string | null
  email: string
  github: string | null
  portefolio: string | null
  poste: string | null
  inscritLe: string
}

export const useAdminProfile = () => {
  // Token, profil et déconnexion
  const { token, admin, logout } = useAuth() as {
    token: Ref<string | null>
    admin: Ref<AdminData | null>
    logout: () => void
  }

  const config = useRuntimeConfig()

  // Récupère le profil depuis l’API
  const fetchProfile = async () => {
    if (!token.value) return

    try {
      const data = await $fetch<AdminData>(`${config.public.backendUrl}/api/v1/admin/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      admin.value = data
    }
    catch (err) {
      const fetchError = err as FetchError<{ error: string }>

      logout() // Invalide la session locale

      throw showError({
        statusCode: fetchError.statusCode,
        statusMessage: fetchError.data?.error,
        fatal: true,
      })
    }
  }

  return { admin, logout, fetchProfile }
}
