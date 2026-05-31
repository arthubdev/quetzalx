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

const exchanges =
  computed(
    () =>
      exchangesResponse.value?.data ??
      [],
  )

function exchangeName(
  id: string,
) {
  const exchange =
    exchanges.value.find(
      (
        item: any,
      ) =>
        item.id === id,
    )

  return (
    exchange?.name ??
    'Unknown'
  )
}

const routes =
  computed(() => {
    const opportunities =
      opportunitiesResponse.value?.data ??
      []

    const grouped =
      new Map()

    for (
      const item
      of opportunities
    ) {
      const route =
        `${item.buyExchangeId}-${item.sellExchangeId}`

      if (
        !grouped.has(
          route,
        )
      ) {
        grouped.set(
          route,
          {
            buyExchangeId:
              item.buyExchangeId,

            sellExchangeId:
              item.sellExchangeId,

            count: 0,

            totalProfit: 0,
          },
        )
      }

      const current =
        grouped.get(
          route,
        )

      current.count += 1

      current.totalProfit +=
        Number(
          item.estimatedProfit,
        )
    }

    return Array.from(
      grouped.values(),
    )
      .map(
        (
          route: any,
        ) => ({
          ...route,

          averageProfit:
            route.totalProfit /
            route.count,
        }),
      )
      .sort(
        (
          a: any,
          b: any,
        ) =>
          b.averageProfit -
          a.averageProfit,
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
        Top Arbitrage Routes
      </h3>

      <span
        class="
          text-xs
          text-slate-400
        "
      >
        {{
          routes.length
        }}
        routes
      </span>
    </div>

    <div
      class="
        mt-6
        space-y-4
      "
    >
      <div
        v-for="route in routes"
        :key="
          `${route.buyExchangeId}-${route.sellExchangeId}`
        "
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
                exchangeName(
                  route.buyExchangeId,
                )
              }}
              →
              {{
                exchangeName(
                  route.sellExchangeId,
                )
              }}
            </h4>

            <p
              class="
                mt-1
                text-xs
                text-slate-400
              "
            >
              {{
                route.count
              }}
              opportunities
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
                route.averageProfit.toFixed(
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
              avg profit
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>