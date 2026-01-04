<script setup>
const config = useRuntimeConfig()
const route = useRoute()

onMounted(async () => {
  // On vérifie s'il y a un token dans l'URL
  const token = route.query.token

  if (token) {
    // On enregistre le token dans le navigateur
    localStorage.setItem('auth_token', token)

    // On redirige immédiatement vers l'accueil sans le token dans l'URL
    await navigateTo('/')
    return
  }

  // Vérifie si le token est encore valide pour rediriger vers la page de profil
  const existingToken = localStorage.getItem('auth_token')
  if (existingToken) {
    const res = await fetch(`${config.public.backendUrl}/admin/profile`, {
      headers: { Authorization: `Bearer ${existingToken}` }
    })
    if (res.ok) await navigateTo('/')
  }
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="p-4 py-8 text-center text-2xl font-bold">
      Connexion Administrateur
    </h1>
    <a
      :href="`${config.public.backendUrl}/auth/google`"
      class="flex items-center gap-3 rounded-lg border px-6 py-2 transition hover:bg-gray-50"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        width="20"
      />
      Continuer avec Google
    </a>
  </div>
</template>
