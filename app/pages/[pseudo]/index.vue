<template>
  <main>
    <h1>Page de Profil</h1>
    <div v-if="admin">
      <h2>Profil de {{ admin.pseudo }}</h2>
      <ul>
        <li><strong>Nom :</strong> {{ admin.noms }}</li>
        <li><strong>Email :</strong> {{ admin.email }}</li>
        <li><strong>Pseudo :</strong> {{ admin.pseudo }}</li>
        <li v-if="admin.poste">
          <strong>Poste :</strong> {{ admin.poste }}
        </li>
        <li v-if="admin.description">
          <strong>Description :</strong> {{ admin.description }}
        </li>
        <li v-if="admin.github">
          <strong>GitHub :</strong> <a
            :href="admin.github"
            target="_blank"
          >Lien</a>
        </li>
        <li v-if="admin.portefolio">
          <strong>Portfolio :</strong> <a
            :href="admin.portefolio"
            target="_blank"
          >Lien</a>
        </li>
        <li><strong>Inscrit le :</strong> {{ formatDate(admin.inscritLe) }}</li>
      </ul>
      <button @click="logout">
        Se déconnecter
      </button>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
// Composable pour gérer le profil admin et la session
const { admin, logout, fetchProfile } = useAdminProfile()
const route = useRoute()

onMounted(async () => {
  if (!admin.value) {
    await fetchProfile() // Charge le profil si nécessaire
  }

  // Redirection si le pseudo dans l'URL ne correspond pas
  if (admin.value && route.params.pseudo !== admin.value.pseudo) {
    await navigateTo(`/${admin.value.pseudo}`)
  }
})
</script>
