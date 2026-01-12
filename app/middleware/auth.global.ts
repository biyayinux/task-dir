export default defineNuxtRouteMiddleware((to) => {
  const { token } = useAuth()

  // Autoriser callback et login
  if (to.path === '/auth/callback' || to.path === '/login') {
    return
  }

  // Redirige si pas de token
  if (!token.value) {
    return navigateTo('/login')
  }
})
