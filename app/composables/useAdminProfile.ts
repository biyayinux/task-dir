// Interface pour les données de l'administrateur
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
  // Récupère le token, le profil et la fonction logout
  const { token, admin, logout } = useAuth() as {
    token: Ref<string | null>
    admin: Ref<AdminData | null>
    logout: () => void
  }

  const config = useRuntimeConfig()

  const fetchProfile = async () => {
    if (!token.value) return // Stop si pas de token

    try {
      // Récupère le profil admin depuis le backend
      const data = await $fetch<AdminData>(`${config.public.backendUrl}/api/v1/admin/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      admin.value = data // Met à jour l'état avec les données
    }
    catch {
      logout() // Supprime la session si erreur
    }
  }

  return { admin, logout, fetchProfile }
}
