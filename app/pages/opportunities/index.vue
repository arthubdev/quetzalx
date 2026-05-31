<script setup lang="ts">
import { ref } from 'vue'

import SectionTitle
from '@/components/ui/SectionTitle.vue'

import OpportunityMetricsCard
from '@/components/opportunities/OpportunityMetricsCard.vue'

import OpportunityHistoryCard
from '@/components/opportunities/OpportunityHistoryCard.vue'

import MarketMonitorCard
from '@/components/dashboard/MarketMonitorCard.vue'

import LiveOpportunitiesCard
from '@/components/dashboard/LiveOpportunitiesCard.vue'

import TopRoutesCard
from '@/components/opportunities/TopRoutesCard.vue'

import RouteAnalyticsCard
from '@/components/opportunities/RouteAnalyticsCard.vue'

import OpportunityProfitChart
from '@/components/opportunities/OpportunityProfitChart.vue'

import TopOpportunityCard
from '@/components/opportunities/TopOpportunityCard.vue'

type OpportunityTab =
  | 'routes'
  | 'market'
  | 'history'

const activeTab =
  ref<OpportunityTab>(
    'routes',
  )

const tabs: Array<{
  key: OpportunityTab
  label: string
  description: string
}> = [
  {
    key: 'routes',
    label: 'Routes',
    description:
      'Arbitrage paths',
  },
  {
    key: 'market',
    label: 'Market',
    description:
      'Live quotes',
  },
  {
    key: 'history',
    label: 'History',
    description:
      'Execution log',
  },
]
</script>

<template>
  <div
    class="
      space-y-8
    "
  >
    <SectionTitle
      title="Opportunities"
      subtitle="Real-Time Arbitrage Detection"
    />

    <!-- KPI / SUMMARY -->

    <OpportunityMetricsCard />

    <!-- HERO BLOCK OF THE PAGE -->

    <div
      class="
        grid
        gap-6

        xl:grid-cols-[1.05fr_0.95fr]
      "
    >
      <TopOpportunityCard />

      <LiveOpportunitiesCard />
    </div>

    <!-- TABBED CONTROL CENTER -->

    <section
      class="
        rounded-3xl

        border
        border-slate-800

        bg-slate-950/60

        p-4
        sm:p-6

        backdrop-blur
      "
    >
      <div
        class="
          flex
          flex-col
          gap-4

          border-b
          border-slate-800

          pb-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <p
            class="
              text-xs
              font-semibold

              uppercase
              tracking-[0.22em]

              text-slate-500
            "
          >
            Control Center
          </p>

          <h2
            class="
              mt-2
              text-2xl
              font-semibold
            "
          >
            Explore the data by context
          </h2>
        </div>

        <div
          class="
            flex
            flex-wrap
            gap-2
          "
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            @click="activeTab = tab.key"
            class="
              rounded-full

              px-4
              py-2

              text-sm
              font-medium

              transition-all
            "
            :class="
              activeTab === tab.key
                ? 'bg-[#00C389] text-black shadow-[0_0_24px_rgba(0,195,137,0.2)]'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
            "
          >
            {{ tab.label }}
            <span
              class="
                ml-2
                text-xs

                opacity-70
              "
            >
              {{ tab.description }}
            </span>
          </button>
        </div>
      </div>

      <!-- ROUTES TAB -->

      <div
        v-if="activeTab === 'routes'"
        class="
          mt-6

          grid
          gap-6

          xl:grid-cols-[1.1fr_0.9fr]
        "
      >
        <TopRoutesCard />
        <RouteAnalyticsCard />
      </div>

      <!-- MARKET TAB -->

      <div
        v-else-if="activeTab === 'market'"
        class="
          mt-6

          grid
          gap-6

          xl:grid-cols-[1.1fr_0.9fr]
        "
      >
        <MarketMonitorCard />
        <OpportunityProfitChart />
      </div>

      <!-- HISTORY TAB -->

      <div
        v-else
        class="
          mt-6
        "
      >
        <OpportunityHistoryCard />
      </div>
    </section>
  </div>
</template>