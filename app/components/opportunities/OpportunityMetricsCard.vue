<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/opportunities/live',
  {
    server: false,
    refresh: 3000,
  },
)

const opportunities =
  computed(
    () =>
      data.value?.opportunities ??
      [],
  )

const profitable =
  computed(
    () =>
      opportunities.value.filter(
        (item: any) =>
          Number(
            item.netProfit,
          ) > 0,
      ).length,
  )

const averageSpread =
  computed(() => {
    if (
      !opportunities.value.length
    ) {
      return 0
    }

    return (
      opportunities.value.reduce(
        (
          total: number,
          item: any,
        ) =>
          total +
          Number(
            item.spread,
          ),
        0,
      ) /
      opportunities.value.length
    )
  })

const bestNetProfit =
  computed(() => {
    const profitableRoutes =
      opportunities.value.filter(
        (item: any) =>
          Number(
            item.netProfit,
          ) > 0,
      )

    if (
      !profitableRoutes.length
    ) {
      return 0
    }

    return Math.max(
      ...profitableRoutes.map(
        (
          item: any,
        ) =>
          Number(
            item.netProfit,
          ),
      ),
    )
  })
</script>

<template>
  <BaseCard>
    <div
      class="
        grid
        gap-6

        md:grid-cols-4
      "
    >
      <!-- Opportunities -->

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Opportunities
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{ opportunities.length }}
        </h3>
      </div>

      <!-- Profitable -->

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Profitable
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
          :class="
            profitable === 0
              ? 'text-slate-500'
              : profitable <= 3
              ? 'text-yellow-400'
              : 'text-green-400'
          "
        >
          {{ profitable }}
        </h3>
      </div>

      <!-- Spread -->

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Avg Spread
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{
            averageSpread.toFixed(
              2,
            )
          }}
        </h3>
      </div>

      <!-- Best Net -->

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Best Net
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
          :class="
            bestNetProfit > 0
              ? 'text-cyan-400'
              : 'text-slate-500'
          "
        >
          {{
            bestNetProfit > 0
              ? `$ ${bestNetProfit.toFixed(2)}`
              : 'N/A'
          }}
        </h3>
      </div>
    </div>
  </BaseCard>
</template>