<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
const { errorMessage, googleLoginUrl, checkSession } = useAuthLogin()

// Mise en page
definePageMeta({
  layout: 'none'
})

onMounted(() => {
  checkSession()
})
</script>

<template>
  <div class="flex flex-col items-center pt-20">
    <div class="text-center">
      <ShieldCheck class="mx-auto mb-6 h-15 w-15" />
      <UiTitle>Se connecter à TaskDir</UiTitle>
      <UiParagraph v-if="errorMessage">
        {{ errorMessage }}
      </UiParagraph>
      <UiParagraph v-else>
        Cette plateforme est accessible uniquement aux administrateurs de mkdir.
      </UiParagraph>
    </div>
    <div class="mt-6 text-center">
      <a :href="googleLoginUrl" class="inline-block">
        <UiButton class="mx-auto flex items-center gap-3">
          <img src="/images/icons/google.svg" width="20" alt="Google" />
          <span>Continuer avec Google</span>
        </UiButton>
      </a>
      <small class="mt-6 block">
        <a href="mailto:contact@mkdir.store">
          Contactez-nous par email en cliquant ici
        </a>
      </small>
    </div>
  </div>
</template>
