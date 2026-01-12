<template>
  <div>Finalisation de la session...</div>
</template>

<script setup>
// Récupère le token depuis l'URL
const route = useRoute()
const { token } = useAuth()

onMounted(() => {
  const urlToken = route.query.token

  if (urlToken) {
    token.value = urlToken // Enregistre le token

    // Redirection vers l'accueil
    setTimeout(() => {
      navigateTo('/')
    }, 100)
  }
  else {
    navigateTo('/login') // Si pas de token
  }
})
</script>
