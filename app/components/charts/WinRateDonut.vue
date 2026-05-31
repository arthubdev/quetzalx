<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

import {
  useDashboardData,
} from '@/composables/useDashboardData'

const dashboardData =
  useDashboardData()

const totalTrades =
  computed(
    () =>
      dashboardData.value?.trades
        ?.length ?? 0,
  )

const wins =
  computed(
    () =>
      dashboardData.value?.trades?.filter(
        (
          trade: any,
        ) =>
          Number(
            trade.netProfit,
          ) > 0,
      ).length ?? 0,
  )

const losses =
  computed(
    () =>
      totalTrades.value -
      wins.value,
  )

const winRate =
  computed(() =>
    totalTrades.value
      ? (
          wins.value /
          totalTrades.value
        ) *
        100
      : 0,
  )

const series =
  computed(() => [
    wins.value,
    losses.value,
  ])

const options = {
  chart: {
    background:
      'transparent',
  },

  labels: [
    'Wins',
    'Losses',
  ],

  colors: [
    '#00C389',
    '#EF4444',
  ],

  theme: {
    mode: 'dark',
  },

  legend: {
    position: 'bottom',
    fontSize: '14px',
  },

  plotOptions: {
    pie: {
      offsetY: 10,

      donut: {
        size: '68%',
      },
    },
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    width: 2,
  },
}
</script>

<template>
  <BaseCard
    class="
      overflow-hidden
    "
  >
    <h3
      class="
        text-lg
        font-semibold
      "
    >
      Win Rate
    </h3>

    <div
      class="
        h-[220px]
        overflow-hidden
      "
    >
      <ClientOnly>
        <ApexChart
          type="donut"
          height="195"
          :options="options"
          :series="series"
        />
      </ClientOnly>
    </div>

    <div
      class="
        grid
        grid-cols-3

        text-center

        border-t
        border-slate-800

        pt-4
      "
    >
      <div>
        <p
          class="
            text-xs
            text-slate-500
          "
        >
          Wins
        </p>

        <p
          class="
            mt-1

            text-green-400
            font-semibold
            text-2xl
          "
        >
          {{ wins }}
        </p>
      </div>

      <div>
        <p
          class="
            text-xs
            text-slate-500
          "
        >
          Losses
        </p>

        <p
          class="
            mt-1

            text-red-400
            font-semibold
            text-2xl
          "
        >
          {{ losses }}
        </p>
      </div>

      <div>
        <p
          class="
            text-xs
            text-slate-500
          "
        >
          Rate
        </p>

        <p
          class="
            mt-1

            text-white
            font-semibold
            text-2xl
          "
        >
          {{ winRate.toFixed(0) }}%
        </p>
      </div>
    </div>
  </BaseCard>
</template>