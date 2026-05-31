<script setup lang="ts">
import SectionTitle
from '@/components/ui/SectionTitle.vue'

import MetricCardPro
from '@/components/ui/MetricCardPro.vue'

import ProfitHistoryChart
from '@/components/charts/ProfitHistoryChart.vue'

import WinRateDonut
from '@/components/charts/WinRateDonut.vue'

import RecentTradesCard
from '@/components/dashboard/RecentTradesCard.vue'

import WalletSummaryCard
from '@/components/dashboard/WalletSummaryCard.vue'

import {
  useDashboard,
} from '@/composables/useDashboard'

import {
  useDashboardData,
} from '@/composables/useDashboardData'

import TabbedCard
from '@/components/ui/TabbedCard.vue'

import SystemOverviewCard
from '@/components/dashboard/SystemOverviewCard.vue'

import HeroBanner
from '@/components/dashboard/HeroBanner.vue'

import {
  watchEffect,
  computed,
  onMounted,
} from 'vue'

const {
  data,
  pending,
  error,
} = useDashboard()

const {
  data: metricsHistory,
  refresh: refreshMetricsHistory,
} = useFetch(
  '/api/metrics/history',
)

onMounted(() => {
  setInterval(
    () => {
      refreshMetricsHistory()
    },
    15000,
  )
}) 

const dashboardData =
  useDashboardData()

watchEffect(() => {
  dashboardData.value =
    data.value
})

const profitSeries =
  computed(() =>
    metricsHistory.value?.data
      ?.slice(-20)
      .map(
        (
          item: any,
        ) =>
          Number(
            item.totalProfit,
          ),
      ) ?? [],
  )

const tradesSeries =
  computed(() =>
    metricsHistory.value?.data
      ?.slice(-20)
      .map(
        (
          item: any,
        ) =>
          Number(
            item.totalTrades,
          ),
      ) ?? [],
  )

const opportunitiesSeries =
  computed(() =>
    metricsHistory.value?.data
      ?.slice(-20)
      .map(
        (
          item: any,
        ) =>
          Number(
            item.totalOpportunities,
          ),
      ) ?? [],
  )

const winRateSeries =
  computed(() =>
    metricsHistory.value?.data
      ?.slice(-20)
      .map(
        (
          item: any,
        ) =>
          Number(
            item.winRate,
          ),
      ) ?? [],
  )
</script>

<template>
  <div
    class="
      space-y-8
    "
  >
    <SectionTitle
      title="Dashboard"
      subtitle="Real-Time Arbitrage Intelligence"
    />

    <HeroBanner />

    <div
      v-if="pending"
      class="
        grid
        gap-5

        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <div
        v-for="n in 4"
        :key="n"
        class="
          h-[180px]

          rounded-2xl

          border
          border-slate-800

          bg-slate-900

          animate-pulse
        "
      />
    </div>

    <div
      v-else-if="error"
      class="
        text-red-500
      "
    >
      Failed to load dashboard
    </div>

    <template
      v-else
    >
      <!-- KPI Cards -->

      <div
        class="
          grid
          gap-5

          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <MetricCardPro
          title="TOTAL PROFIT (24H)"
          :value="
            `$${data?.metrics?.total_profit ?? 0}`
          "
          change="+12.46%"
          color="green"
          icon="profit"
          :series="profitSeries"
        />

        <MetricCardPro
          title="TRADES (24H)"
          :value="
            data?.metrics?.total_trades ?? 0
          "
          change="+20%"
          color="purple"
          icon="trades"
          :series="tradesSeries"
        />

        <MetricCardPro
          title="OPPORTUNITIES (24H)"
          :value="
            data?.metrics?.total_opportunities ?? 0
          "
          change="+50%"
          color="blue"
          icon="opportunities"
          :series="opportunitiesSeries"
        />

        <MetricCardPro
          title="WIN RATE (24H)"
          :value="
            `${Number(
              data?.metrics?.win_rate ?? 0,
            ).toFixed(0)}%`
          "
          change="+0%"
          color="yellow"
          icon="winrate"
          :series="winRateSeries"
        />
      </div>

      <SystemOverviewCard />

      <!-- Charts -->

      <div
  class="
    grid
    gap-5

    xl:grid-cols-[1.6fr_0.9fr]
    items-start
  "
>
  <!-- PANEL PRINCIPAL -->

  <TabbedCard
    left-label="Profit History"
    right-label="Recent Trades"
  >
    <template #left>
      <ProfitHistoryChart />
    </template>

    <template #right>
      <RecentTradesCard />
    </template>
  </TabbedCard>

  <!-- PANEL LATERAL -->

  <TabbedCard
    left-label="Win Rate"
    right-label="Wallets"
  >
    <template #left>
      <WinRateDonut />
    </template>

    <template #right>
      <WalletSummaryCard />
        </template>
    </TabbedCard>
    </div>

      <!-- Dashboard Summary -->

      <div
        class="
          grid
          gap-6

          xl:grid-cols-2
        "
      >
      </div>


    </template>
  </div>
</template>