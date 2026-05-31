<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data: opportunitiesResponse,
} = useFetch(
  '/api/opportunities',
  {
    server: false,
  },
)

const {
  data: exchangesResponse,
} = useFetch(
  '/api/exchanges',
  {
    server: false,
  },
)

const ranking =
  computed(() => {
    const opportunities =
      opportunitiesResponse.value?.data ??
      []

    const exchanges =
      exchangesResponse.value?.data ??
      []

    const stats =
      new Map()

    for (
      const exchange
      of exchanges
    ) {
      stats.set(
        exchange.id,
        {
          id: exchange.id,
          name: exchange.name,
          opportunities: 0,
          totalSpread: 0,
        },
      )
    }

    for (
      const opportunity
      of opportunities
    ) {
      const exchange =
        stats.get(
          opportunity.buyExchangeId,
        )

      if (
        exchange
      ) {
        exchange.opportunities += 1

        exchange.totalSpread +=
          Number(
            opportunity.spread,
          )
      }
    }

    return Array.from(
      stats.values(),
    )
      .map(
        (
          exchange: any,
        ) => ({
          ...exchange,

          averageSpread:
            exchange.opportunities
              ? exchange.totalSpread /
                exchange.opportunities
              : 0,
        }),
      )
      .sort(
        (
          a: any,
          b: any,
        ) =>
          b.opportunities -
          a.opportunities,
      )
  })
</script>

<template>
  <BaseCard>
    <div
      class="
        flex
        items-center
        justify-between
      "
    >
      <h3
        class="
          text-lg
          font-semibold
        "
      >
        Opportunity Ranking
      </h3>
    </div>

    <div
      class="
        mt-6
        overflow-x-auto
      "
    >
      <table
        class="
          w-full
          text-sm
        "
      >
        <thead>
          <tr
            class="
              border-b
              border-slate-800
              text-slate-400
            "
          >
            <th class="pb-3 text-left">
              Exchange
            </th>

            <th class="pb-3 text-right">
              Opportunities
            </th>

            <th class="pb-3 text-right">
              Avg Spread
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="exchange in ranking"
            :key="exchange.id"
            class="
              border-b
              border-slate-900
            "
          >
            <td class="py-3">
              {{ exchange.name }}
            </td>

            <td
              class="
                py-3
                text-right
              "
            >
              {{
                exchange.opportunities
              }}
            </td>

            <td
              class="
                py-3
                text-right
                text-cyan-400
              "
            >
              $
              {{
                exchange.averageSpread.toFixed(
                  2,
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>