<template>
  <div class="text-center">
    <h1 class="p-4 py-8 text-2xl">
      Système interne de gestion réservé aux membres officiels de la start-up
      MKDIR
    </h1>

    <NuxtLink
      href="/login"
      class="inline-block rounded-lg bg-[#24455C] px-6 py-2 text-white"
    >
      Se connecter
    </NuxtLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title =
    'Système interne de gestion réservé aux membres officiels de la start-up MKDIR'
})
</script>
