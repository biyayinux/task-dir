<script setup lang="ts">
const { others, isLoading, fetchOthers } = useOthersAdmins()
const { fetchProfile } = useMeAdmin()

onMounted(() => {
  fetchProfile()
  fetchOthers()
})
</script>

<template>
  <div>
    <div class="space-y-4">
      <div class="flex -space-x-3">
        <ClientOnly>
          <template v-if="!isLoading">
            <NuxtLink
              v-for="(admin, index) in others"
              :key="index"
              :to="`/admins/${admin.pseudo}`"
              class="relative inline-block transition-transform hover:z-10 hover:scale-110"
            >
              <img
                :src="admin.photo_profil || '/images/avatar.svg'"
                class="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                :alt="`Profil de ${admin.pseudo}`"
              />
            </NuxtLink>
          </template>
          <template #fallback>
            <div class="flex -space-x-3">
              <div
                v-for="i in 3"
                :key="i"
                class="h-10 w-10 animate-pulse rounded-full bg-gray-100 ring-2 ring-white"
              />
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
