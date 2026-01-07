<script setup lang="ts">
const { fetchProfile } = useMeAdmin()

// Récupération des données au montage du composant
onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci doloribus
    porro quidem! Adipisci in harum pariatur fugit molestias similique eaque
    vitae cumque, optio animi iste ex labore eius aliquid quam.
  </p>
</template>
