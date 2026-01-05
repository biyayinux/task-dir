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
      // Stocke les données venant de la base de données SQL
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
      <UiTitle>Bienvenue {{ admin.pseudo }}</UiTitle>
      <div class="flex flex-col items-center gap-3 text-center">
        <UiAvatar
          :src="admin.photo_profil ? admin.photo_profil : '/images/avatar.svg'"
        />
        <div class="space-y-2">
          <UiParagraph>{{ admin.noms }}</UiParagraph>
          <UiParagraph>{{ admin.email }}</UiParagraph>
          <UiParagraph v-if="admin.poste">{{ admin.poste }}</UiParagraph>
        </div>
      </div>
      <UiButton @click="logout" class="mt-6"> Se déconnecter </UiButton>
    </div>
    <div v-else class="flex flex-col items-center gap-4 py-20">
      <UiParagraph>Chargement du profil...</UiParagraph>
    </div>
  </div>
</template>
