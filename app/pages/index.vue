<script setup>
const config = useRuntimeConfig()
const admin = ref(null)

// Fonction de déconnexion
const logout = () => {
  localStorage.removeItem('auth_token') // Supprime le token
  navigateTo('/login')
}

onMounted(async () => {
  const token = localStorage.getItem('auth_token')

  // On récupère les infos via la route /admin/me
  if (token) {
    try {
      const response = await fetch(`${config.public.backendUrl}/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.ok) {
        admin.value = await response.json()
      } else {
        // Nettoyage si le token est invalide
        localStorage.removeItem('auth_token')
        await navigateTo('/login')
      }
    } catch (error) {
      console.error('Erreur de récupération', error)
      await navigateTo('/login')
    }
  } else {
    // Redirection si aucun token trouvé
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6">
    <UiTitle>Page d'accueil</UiTitle>
    <div v-if="admin" class="flex flex-col items-center gap-4">
      <NuxtLink :to="`/${admin.pseudo}`">
        <UiButton> Voir mon profil {{ admin.pseudo }} </UiButton>
      </NuxtLink>
      <button
        @click="logout"
        class="text-sm text-red-500 underline transition-colors hover:text-red-700"
      >
        Se déconnecter
      </button>
    </div>
    <div v-else class="flex flex-col items-center gap-4">
      <p class="text-sm text-gray-400">Chargement de votre session...</p>
    </div>
  </div>
</template>
