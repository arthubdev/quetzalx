<script setup lang="ts">
import AppSidebar from '../components/layout/AppSidebar.vue'

import AppHeader from '../components/layout/AppHeader.vue'

import MobileSidebar from '../components/layout/MobileSidebar.vue'
</script>

<template>
  <div
    class="
      min-h-screen

      bg-[var(--qx-background)]

      text-[var(--qx-text)]
    "
  >
    <MobileSidebar />

    <AppSidebar />

    <div
      class="
        lg:pl-72
      "
    >
      <AppHeader />

      <main
        class="
          p-4
          sm:p-6
          lg:p-8
        "
      >
        <slot />
      </main>
    </div>
  </div>
</template>