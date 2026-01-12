export const useAuth = () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24, // 24h
    sameSite: 'lax',
  })

  const admin = useState('admin_data', () => null)

  const logout = () => {
    token.value = null
    admin.value = null
    navigateTo('/login') // Redirection après déconnexion
  }

  return { token, admin, logout }
}
