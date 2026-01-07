export const useAuthLogin = () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const errorMessage = ref('')

  const checkSession = async () => {
    // Gestion des erreurs via URL
    if (route.query.error === 'unauthorized') {
      errorMessage.value = 'Adresse email non autorisée'
    } else if (route.query.error) {
      errorMessage.value = 'Erreur lors de la connexion Google'
    }

    // Capture du token
    const token = route.query.token as string
    if (token) {
      localStorage.setItem('auth_token', token)
      return navigateTo('/')
    }

    // Vérification session existante
    const existingToken = localStorage.getItem('auth_token')
    if (existingToken) {
      try {
        const res = await fetch(`${config.public.backendUrl}/api/admin/me`, {
          headers: { Authorization: `Bearer ${existingToken}` }
        })
        if (res.ok) return navigateTo('/')
        else localStorage.removeItem('auth_token')
      } catch (e) {
        console.error(e)
      }
    }
  }

  const googleLoginUrl = computed(
    () => `${config.public.backendUrl}/auth/google`
  )

  return {
    errorMessage,
    googleLoginUrl,
    checkSession
  }
}
