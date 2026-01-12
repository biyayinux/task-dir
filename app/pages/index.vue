<template>
  <main>
    <h1>Accueil Administration</h1>
    <div v-if="admin">
      <p>Bienvenue {{ admin.noms }}</p>
      <NuxtLink :to="`/${admin.pseudo}`">
        Accéder à votre profil
      </NuxtLink>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
// Récupère le profil admin
const { admin, fetchProfile } = useAdminProfile()

onMounted(async () => {
  if (!admin.value) {
    await fetchProfile() // Charge les données si elles n'existent pas
  }
})
</script>
