<script setup lang="ts">
import {
  useDashboardData,
} from '@/composables/useDashboardData'

const dashboardData =
  useDashboardData()

const totalProfit =
  computed(
    () =>
      Number(
        dashboardData.value?.metrics
          ?.total_profit ?? 0,
      ).toFixed(2),
  )

const totalTrades =
  computed(
    () =>
      dashboardData.value?.metrics
        ?.total_trades ?? 0,
  )

const totalOpportunities =
  computed(
    () =>
      dashboardData.value?.metrics
        ?.total_opportunities ?? 0,
  )

const winRate =
  computed(
    () =>
      Number(
        dashboardData.value?.metrics
          ?.win_rate ?? 0,
      ).toFixed(0),
  )
</script>

<template>
  <div
    class="
      relative

      overflow-hidden

      rounded-3xl

      border
      border-slate-800

      bg-gradient-to-br
      from-[#091325]
      via-[#0F172A]
      to-[#020617]

      p-8
    "
  >
    <div
      class="
        absolute

        right-0
        top-0

        h-64
        w-64

        rounded-full

        bg-[#00C389]/10

        blur-3xl
      "
    />

    <div
      class="
        relative
        z-10
      "
    >
      <span
        class="
          rounded-full

          border
          border-[#00C389]/20

          bg-[#00C389]/10

          px-3
          py-1

          text-xs
          font-medium

          text-[#00C389]
        "
      >
        LIVE MARKET MONITORING
      </span>

      <h1
        class="
          mt-5

          text-4xl
          font-bold
        "
      >
        Quetzal X
      </h1>

      <p
        class="
          mt-2

          max-w-3xl

          text-slate-400
        "
      >
        AI-powered cryptocurrency arbitrage
        platform designed to detect profitable
        opportunities across multiple exchanges
        and execute trades automatically.
      </p>

      <div
        class="
          mt-2

          grid
          gap-2

          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
      </div>
    </div>
  </div>
</template>