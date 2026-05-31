<script setup lang="ts">
defineProps<{
  label: string
  status:
    | 'success'
    | 'danger'
    | 'warning'
}>()
</script>

<template>
  <span
    class="
      inline-flex
      items-center

      rounded-full

      px-3
      py-1

      text-xs
      font-medium
    "
    :class="{
      'bg-green-500/10 text-green-400':
        status === 'success',

      'bg-red-500/10 text-red-400':
        status === 'danger',

      'bg-yellow-500/10 text-yellow-400':
        status === 'warning',
    }"
  >
    {{ label }}
  </span>
</template>