<template>
  <div>Finalisation...</div>
</template>

<script setup lang="ts">
// Récupère le token depuis l'URL
const route = useRoute()
const { token } = useAuth() as { token: Ref<string | null> }

onMounted((): void => {
  const urlToken = route.query.token as string | undefined

  if (urlToken) {
    token.value = urlToken // Enregistre le token

    // Redirection vers l'accueil
    setTimeout(() => {
      navigateTo('/')
    }, 100)
  }
  else {
    navigateTo('/login') // Redirection si pas de token
  }
})
</script>
