<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data: tradesResponse,
} = useFetch(
  '/api/trades',
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

const performance =
  computed(() => {
    const trades =
      tradesResponse.value?.data ??
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
          trades: 0,
          profit: 0,
        },
      )
    }

    for (
      const trade
      of trades
    ) {
      const buyExchange =
        stats.get(
          trade.buyExchangeId,
        )

      const sellExchange =
        stats.get(
          trade.sellExchangeId,
        )

      if (
        buyExchange
      ) {
        buyExchange.trades += 1
      }

      if (
        sellExchange
      ) {
        sellExchange.trades += 1

        sellExchange.profit +=
          Number(
            trade.netProfit,
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
    <h3
      class="
        text-lg
        font-semibold
      "
    >
      Exchange Performance
    </h3>

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
              Trades
            </th>

            <th class="pb-3 text-right">
              Profit
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="exchange in performance"
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
              {{ exchange.trades }}
            </td>

            <td
              class="
                py-3
                text-right
                text-green-400
              "
            >
              $
              {{
                exchange.profit.toFixed(
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