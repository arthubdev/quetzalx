<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/exchanges',
  {
    server: false,
  },
)

const exchanges =
  computed(
    () =>
      data.value?.data ??
      [],
  )
</script>

<template>
  <BaseCard>
    <h3
      class="
        text-lg
        font-semibold
      "
    >
      Exchange Status
    </h3>

    <div
      class="
        mt-6
        space-y-4
      "
    >
      <div
        v-for="exchange in exchanges"
        :key="exchange.id"
        class="
          flex
          items-center
          justify-between

          rounded-lg
          border
          border-slate-800

          px-4
          py-3
        "
      >
        <span>
          {{
            exchange.name
          }}
        </span>

        <span
          class="
            rounded-full

            bg-green-500/20

            px-2
            py-1

            text-xs
            font-medium

            text-green-400
          "
        >
          ACTIVE
        </span>
      </div>
    </div>
  </BaseCard>
</template>