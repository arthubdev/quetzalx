<script setup lang="ts">
import SectionTitle
from '@/components/ui/SectionTitle.vue'

import HealthStatusCard
from '@/components/system/HealthStatusCard.vue'

import ExchangeStatusCard
from '@/components/system/ExchangeStatusCard.vue'

import LatencyMonitorCard
from '@/components/system/LatencyMonitorCard.vue'

import LiveMarketFeedCard
from '@/components/system/LiveMarketFeedCard.vue'

import ActivityTimelineCard
from '@/components/system/ActivityTimelineCard.vue'

import SystemStatusCard
from '@/components/system/SystemStatusCard.vue'

</script>

<template>
  <div
    class="
      space-y-8
    "
  >
    <SectionTitle
      title="System"
      subtitle="Infrastructure Monitoring"
    />

    <HealthStatusCard />

    <SystemStatusCard />

    <div
      class="
        grid
        gap-6

        xl:grid-cols-2
      "
    >
      <ExchangeStatusCard />

      <LatencyMonitorCard />
    </div>

    <LiveMarketFeedCard />

    <ActivityTimelineCard />
  </div>
</template>