<script setup lang="ts">
import SectionTitle
from '@/components/ui/SectionTitle.vue'

import TradesOverviewCard
from '@/components/trades/TradesOverviewCard.vue'

import TradesTableCard
from '@/components/trades/TradesTableCard.vue'
</script>

<template>
  <div
    class="
      space-y-8
    "
  >
    <SectionTitle
      title="Trades"
      subtitle="Executed Arbitrage Operations"
    />

    <TradesOverviewCard />

    <TradesTableCard />
  </div>
</template>