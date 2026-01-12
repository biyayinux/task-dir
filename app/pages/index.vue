<template>
  <main>
    <h1>Tableau de bord</h1>
    <div v-if="admin">
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
// Composable pour récupérer le profil admin et gérer la session
const { admin, logout, fetchProfile } = useAdminProfile()

onMounted(() => {
  fetchProfile() // Charge les données au montage
})
</script>
