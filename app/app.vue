<script setup lang="ts">
import CursorGlow
from '@/components/ui/CursorGlow.vue'
useHead({
  htmlAttrs: {
    class: 'dark',
  },

  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },

    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },

    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
    },
  ],
})
</script>

<template>
  <CursorGlow />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>