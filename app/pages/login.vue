<template>
  <div>
    <h1>Connexion Administration</h1>
    <p>Veuillez vous connecter pour acceder au tableau de bord</p>
    <a :href="loginUrl">
      Se connecter avec Google
    </a>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

// URL de connexion Google
const loginUrl = `${config.public.backendUrl}/auth/google`
</script>
