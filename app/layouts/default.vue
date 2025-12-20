<template>
  <div
    class="flex min-h-screen flex-col bg-white text-black transition-colors duration-500 ease-in-out dark:bg-gray-950 dark:text-white"
  >
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>
