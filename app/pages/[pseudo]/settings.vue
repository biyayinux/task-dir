<template>
  <main>
    <h1>Paramètres du profil</h1>
    <form
      v-if="admin"
      @submit.prevent="handleUpdate"
    >
      <div>
        <label>Nom :</label>
        <input
          v-model="form.noms"
          type="text"
          required
        >
      </div>
      <div>
        <label>Pseudo :</label>
        <input
          v-model="form.pseudo"
          type="text"
          required
        >
      </div>
      <div>
        <label>Email :</label>
        <input
          v-model="form.email"
          type="email"
          required
        >
      </div>
      <div>
        <label>Description :</label>
        <textarea v-model="form.description" />
      </div>
      <div>
        <label>GitHub :</label>
        <input
          v-model="form.github"
          type="url"
        >
      </div>
      <div>
        <label>Portfolio :</label>
        <input
          v-model="form.portefolio"
          type="url"
        >
      </div>
      <button
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </form>
    <hr>
    <button
      type="button"
      style="color: red;"
      @click="logout"
    >
      Se déconnecter
    </button>
  </main>
</template>

<script setup lang="ts">
// Composable pour gérer le profil admin
const { admin, logout, fetchProfile } = useAdminProfile()
// Composable pour mettre à jour le profil
const { updateProfile, loading } = useEditProfile()

// Formulaire réactif
const form = reactive({
  noms: '',
  pseudo: '',
  email: '',
  description: '',
  github: '',
  portefolio: '',
})

// Remplit le formulaire dès que les données admin sont disponibles
watchEffect(() => {
  if (admin.value) {
    form.noms = admin.value.noms
    form.pseudo = admin.value.pseudo
    form.email = admin.value.email
    form.description = admin.value.description ?? ''
    form.github = admin.value.github ?? ''
    form.portefolio = admin.value.portefolio ?? ''
  }
})

// Soumission du formulaire
const handleUpdate = async () => {
  const success = await updateProfile(form)
  if (success && admin.value) {
    await navigateTo(`/${admin.value.pseudo}`) // Redirection si pseudo changé
  }
}

// Charge le profil si nécessaire
onMounted(async () => {
  if (!admin.value) {
    await fetchProfile()
  }
})
</script>
