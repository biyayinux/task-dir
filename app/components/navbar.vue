<script setup>
import { storeToRefs } from 'pinia'
import { Home, User } from 'lucide-vue-next'

const { me } = storeToRefs(useMeStore())
</script>

<template>
  <header class="p-4">
    <nav class="flex justify-center gap-8">
      <NuxtLink to="/" class="flex items-center gap-2">
        <Home :size="20" />
        <span>Accueil</span>
      </NuxtLink>
      <NuxtLink v-if="me" :to="`/${me.pseudo}`" class="flex items-center gap-2">
        <User :size="20" />
        <span>Profil</span>
      </NuxtLink>
    </nav>
  </header>
</template>
