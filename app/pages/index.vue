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
    const response = await fetch(`${config.public.backendUrl}/auth/admin`, {
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
  <div class="p-6 text-center">
    <div v-if="admin" class="space-y-4">
      <h1 class="text-2xl font-bold">Bienvenue chez MKDIR</h1>
      <div class="flex flex-col items-center gap-2">
        <img
          :src="admin.photos[0].value"
          class="h-20 w-20 rounded-full border shadow"
        />
        <p class="text-lg font-semibold">{{ admin.displayName }}</p>
        <p class="text-gray-600">{{ admin.emails[0].value }}</p>
      </div>
      <button
        @click="logout"
        class="mt-4 block w-full text-center text-red-500 underline"
      >
        Se déconnecter
      </button>
    </div>
    <div v-else class="py-20">Chargement du profil...</div>
  </div>
</template>
