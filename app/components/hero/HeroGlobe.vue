<script setup lang="ts">
import { computed } from 'vue'
const introMode =
  ref(true)

import ExchangeBadge
from '@/components/hero/ExchangeBadge.vue'

const {
  data,
} = await useFetch(
  '/api/dashboard',
  {
    refreshInterval: 5000,
  },
)

const latestTrade =
  computed(() =>
    data.value?.trades?.[0],
  )
</script>

<template>
  <div
    
    class="
      relative

      z-20

      flex
      items-center
      justify-center
    "
  >
    <!-- BUY -->

    <ExchangeBadge
      v-if="latestTrade"
      class="
        absolute

        left-0
        top-20

        z-40
      "
      name="BUY"
      :price="`$${Number(
        latestTrade.buyPrice,
      ).toLocaleString()}`"
      color="#F3BA2F"
    />

    <!-- SELL -->

    <ExchangeBadge
      v-if="latestTrade"
      class="
        absolute

        right-0
        top-40

        z-40
      "
      name="SELL"
      :price="`$${Number(
        latestTrade.sellPrice,
      ).toLocaleString()}`"
      color="#3B82F6"
    />

    <!-- PROFIT -->

    <ExchangeBadge
      v-if="latestTrade"
      class="
        absolute

        bottom-16
        left-20

        z-40
      "
      name="PROFIT"
      :price="`+$${Number(
        latestTrade.grossProfit,
      ).toFixed(2)}`"
      color="#00C389"
    />

    <!-- PLANETA -->

    <img
      src="/textures/earth.png"
      alt="Earth"

      class="
        w-full
        max-w-[900px]

        select-none

        animate-spin-slow

        drop-shadow-[0_0_100px_rgba(0,195,137,0.35)]
      "
    >
  </div>
</template>

<style scoped>
.animate-spin-slow {
  animation:
    spinEarth 650s linear infinite;
}

@keyframes spinEarth {
  from {
    transform:
      rotate(0deg);
  }

  to {
    transform:
      rotate(360deg);
  }
}
</style>