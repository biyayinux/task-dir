<script setup>
const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="py-4 text-center">
    <p class="text-sm">&copy; {{ currentYear }} MKDIR. Tous droits réservés.</p>
  </footer>
</template>
