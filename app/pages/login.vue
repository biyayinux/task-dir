<template>
  <div>
    <h1>Connexion Administration</h1>
    <p>Veuillez vous connecter pour accéder au tableau de bord</p>
    <a :href="loginUrl">
      Se connecter avec Google
    </a>
  </div>
</template>

<script setup lang="ts">
// URL de connexion pour l'authentification Google
const config = useRuntimeConfig()
const loginUrl: string = `${config.public.backendUrl}/auth/google`
</script>
