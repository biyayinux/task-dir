<template>
  <div>
    <h1>Tableau de bord</h1>
    <div v-if="admin">
      <p>Bienvenue, <strong>{{ admin.pseudo }}</strong></p>
      <button @click="logout">
        Se deconnecter
      </button>
    </div>
    <div v-else>
      <p>Chargement du profil...</p>
    </div>
  </div>
</template>

<script setup>
const { token, admin, logout } = useAuth()
const config = useRuntimeConfig()

onMounted(async () => {
  if (!token.value) return // Stop si pas de token

  try {
    const data = await $fetch(`${config.public.backendUrl}/api/v1/admin/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    admin.value = data // Met à jour l'admin
  }
  catch {
    logout() // Supprime la session si erreur
  }
})
</script>
