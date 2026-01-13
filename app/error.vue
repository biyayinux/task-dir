<script setup lang="ts">
// Props reçues par la page d'erreur
defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const handleError = () => {
  // Supprime l'état d'erreur et redirige vers l'accueil
  clearError({ redirect: '/' })
}
</script>

<template>
  <main>
    <h1>Erreur {{ error?.statusCode }}</h1>
    <p>{{ error?.statusMessage }}</p>
    <button @click="handleError">
      Retour à l'accueil
    </button>
  </main>
</template>
