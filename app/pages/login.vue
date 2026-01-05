<script setup>
const config = useRuntimeConfig()
const route = useRoute()

// État pour afficher une erreur si l'email n'est pas autorisé
const errorMessage = ref('')

onMounted(async () => {
  // Vérification des erreurs renvoyées par le backend dans l'URL
  if (route.query.error === 'unauthorized') {
    errorMessage.value =
      'Accès refusé : votre email n’est pas enregistré comme administrateur.'
  } else if (route.query.error) {
    errorMessage.value = 'Une erreur est survenue lors de la connexion Google.'
  }

  // Récupération du token après le callback Google
  const token = route.query.token

  if (token) {
    localStorage.setItem('auth_token', token)
    // Redirection vers l'accueil
    await navigateTo('/')
    return
  }

  // Vérification si une session est déjà active
  const existingToken = localStorage.getItem('auth_token')
  if (existingToken) {
    try {
      const res = await fetch(`${config.public.backendUrl}/admin/me`, {
        headers: { Authorization: `Bearer ${existingToken}` }
      })

      // Si le token est toujours bon, on redirige directement vers l'accueil
      if (res.ok) {
        await navigateTo('/')
      } else {
        // Si le token est expiré, on le nettoie
        localStorage.removeItem('auth_token')
      }
    } catch (error) {
      console.error('Erreur de vérification session')
    }
  }
})
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center gap-10 text-center"
  >
    <div class="space-y-2">
      <UiTitle>Connexion Administrateur</UiTitle>
      <UiParagraph v-if="errorMessage">
        {{ errorMessage }}
      </UiParagraph>
    </div>
    <a :href="`${config.public.backendUrl}/auth/google`" class="block">
      <UiButton>
        <img src="/images/icons/google.svg" width="20" alt="Google" />
        <span>Continuer avec Google</span>
      </UiButton>
    </a>
  </div>
</template>
