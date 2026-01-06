<script setup>
const colorMode = useColorMode()

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="flex items-center justify-between p-4">
    <div class="flex items-center gap-2">
      <LucideClipboardCheck class="h-6 w-6" />
      <h1 class="text-xl">
        <NuxtLink to="/">TaskDir</NuxtLink>
      </h1>
    </div>
    <ClientOnly>
      <button @click="toggleDark" type="button">
        <LucideSun v-if="colorMode.value === 'dark'" class="h-6 w-6" />
        <LucideMoon v-else class="h-6 w-6" />
      </button>
    </ClientOnly>
  </header>
</template>
