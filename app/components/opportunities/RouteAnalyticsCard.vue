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

const analytics =
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
          routes: 0,
          profit: 0,
        },
      )
    }

    for (
      const opportunity
      of opportunities
    ) {
      const buy =
        stats.get(
          opportunity.buyExchangeId,
        )

      if (buy) {
        buy.routes += 1

        buy.profit +=
          Number(
            opportunity.estimatedProfit,
          )
      }
    }

    return Array.from(
      stats.values(),
    ).sort(
      (
        a: any,
        b: any,
      ) =>
        b.profit -
        a.profit,
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
        Exchange Performance
      </h3>
    </div>

    <div
      class="
        mt-6
        space-y-4
      "
    >
      <div
        v-for="exchange in analytics"
        :key="exchange.id"
        class="
          rounded-lg
          border
          border-slate-800
          p-4
        "
      >
        <div
          class="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h4
              class="
                font-medium
              "
            >
              {{
                exchange.name
              }}
            </h4>

            <p
              class="
                text-xs
                text-slate-400
              "
            >
              {{
                exchange.routes
              }}
              routes
            </p>
          </div>

          <div
            class="
              text-right
            "
          >
            <p
              class="
                text-green-400
                font-semibold
              "
            >
              $
              {{
                exchange.profit.toFixed(
                  2,
                )
              }}
            </p>

            <p
              class="
                text-xs
                text-slate-400
              "
            >
              estimated profit
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>