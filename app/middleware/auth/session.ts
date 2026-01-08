export default defineNuxtRouteMiddleware(async (to) => {
  // Ignorer la vérification sur la page de login
  if (to.path === '/login') return

  if (import.meta.client) {
    const token = localStorage.getItem('auth_token')

    // Si pas de token, redirection immédiate
    if (!token) {
      return navigateTo('/login')
    }
    // Récupération automatique du profil admin
  }
})
