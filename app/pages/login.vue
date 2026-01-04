<script setup>
const config = useRuntimeConfig()
const route = useRoute()

onMounted(async () => {
  // Récupère le token depuis l'URL après la connexion Google
  const token = route.query.token

  if (token) {
    // Sauvegarde le token et redirige vers l'accueil
    localStorage.setItem('auth_token', token)
    await navigateTo('/')
    return
  }

  // Vérifie si un token existe déjà dans le navigateur
  const existingToken = localStorage.getItem('auth_token')
  if (existingToken) {
    // Vérifie si le token est toujours valide auprès du backend
    const res = await fetch(`${config.public.backendUrl}/admin/profile`, {
      headers: { Authorization: `Bearer ${existingToken}` }
    })
    // Si valide, redirection automatique vers l'accueil
    if (res.ok) await navigateTo('/')
  }
})
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center gap-10 text-center"
  >
    <UiTitle>Connexion Administrateur</UiTitle>
    <a :href="`${config.public.backendUrl}/auth/google`" class="block">
      <UiButton>
        <img src="/images/icons/google.svg" width="20" alt="Google" />
        <span>Continuer avec Google</span>
      </UiButton>
    </a>
  </div>
</template>
