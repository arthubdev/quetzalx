<script setup lang="ts">
import SectionTitle
from '@/components/ui/SectionTitle.vue'

import ExchangeOverviewCard
from '@/components/exchanges/ExchangeOverviewCard.vue'

import ExchangeStatusCard
from '@/components/exchanges/ExchangeStatusCard.vue'

import ExchangeWalletsCard
from '@/components/exchanges/ExchangeWalletsCard.vue'

import LiveMarketFeedCard
from '@/components/system/LiveMarketFeedCard.vue'
</script>

<template>
  <div
    class="
      space-y-8
    "
  >
    <SectionTitle
      title="Exchanges"
      subtitle="Exchange Management"
    />

    <ExchangeOverviewCard />
    
    <LiveMarketFeedCard />

    <div
      class="
        grid
        gap-6

        xl:grid-cols-2
      "
    >
      <ExchangeStatusCard />

      <ExchangeWalletsCard />
    </div>
  </div>
</template>