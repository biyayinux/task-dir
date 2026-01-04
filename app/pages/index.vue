<script setup>
const config = useRuntimeConfig()
const admin = ref(null)

onMounted(async () => {
  // Récupérer le token stocké
  const token = localStorage.getItem('auth_token')

  // Si pas de token, direction login
  if (!token) {
    await navigateTo('/login')
    return
  }

  try {
    // Appeler le backend avec le header Authorization
    const response = await fetch(`${config.public.backendUrl}/admin/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      admin.value = await response.json()
    } else {
      // Le token est expiré ou invalide
      localStorage.removeItem('auth_token')
      await navigateTo('/login')
    }
  } catch (error) {
    await navigateTo('/login')
  }
})

// Fonction de déconnexion
const logout = () => {
  localStorage.removeItem('auth_token') // Supprime le token
  navigateTo('/login')
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center text-center"
  >
    <div v-if="admin" class="flex flex-col items-center space-y-4">
      <UiTitle>Bienvenue chez MKDIR</UiTitle>
      <div class="flex flex-col items-center gap-2 text-center">
        <UiAvatar :src="admin.photos[0].value" />
        <UiParagraph>{{ admin.displayName }}</UiParagraph>
        <UiParagraph>{{ admin.emails[0].value }}</UiParagraph>
      </div>
      <UiButton @click="logout">Se déconnecter</UiButton>
    </div>
    <div v-else class="py-20">Chargement du profil...</div>
  </div>
</template>
