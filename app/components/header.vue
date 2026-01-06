<script setup>
import { storeToRefs } from 'pinia'

const meStore = useMeStore()

// On déstructure avec storeToRefs pour garantir la réactivité
const { me } = storeToRefs(meStore)
</script>

<template>
  <header class="flex items-center justify-between border-b bg-white p-4">
    <NuxtLink to="/" class="text-xl font-bold">TaskDir</NuxtLink>
    <div v-if="me" class="flex items-center gap-2">
      <span class="text-sm font-medium">{{ me.pseudo }}</span>
      <UiAvatar
        :src="me.photo_profil || '/images/avatar.svg'"
        class="h-8 w-8 rounded-full shadow-sm"
      />
    </div>
    <NuxtLink v-else to="/login" class="text-sm text-gray-500 hover:underline">
      Connexion
    </NuxtLink>
  </header>
</template>
