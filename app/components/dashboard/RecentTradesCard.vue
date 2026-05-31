<script setup lang="ts">
import { computed } from 'vue'

import BaseCard
from '@/components/ui/BaseCard.vue'

import {
  useDashboardData,
} from '@/composables/useDashboardData'


const dashboardData =
  useDashboardData()

const trades =
  computed(
    () =>
      dashboardData.value?.trades ??
      [],
  )

const {
  data: exchangesResponse,
} = await useFetch(
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
  exchangeId: string,
) {
  const exchange =
    exchanges.value.find(
      (
        item: any,
      ) =>
        item.id ===
        exchangeId,
    )

  return (
    exchange?.name ??
    'Unknown'
  )
}
</script>

<template>
  <BaseCard>
    <h3
      class="
        text-lg
        font-semibold
      "
    >
      Recent Trades
    </h3>

    <div
      v-if="
        trades.length
      "
      class="
        mt-5
        space-y-4
      "
    >
      <div
        v-for="trade in trades"
        :key="trade.id"
        class="
          flex
          items-center
          justify-between

          border-b
          border-slate-800

          pb-3
        "
      >
        <div>
          <p
            class="
              text-sm
              font-semibold
              text-white
            "
          >
            {{
              exchangeName(
                trade.buyExchangeId,
              )
            }}
            →
            {{
              exchangeName(
                trade.sellExchangeId,
              )
            }}
          </p>

          <p
            class="
              text-xs
              text-slate-500
            "
          >
            {{
              Number(
                trade.volumeBtc,
              ).toFixed(2)
            }}
            BTC
          </p>
        </div>

        <span
          class="
            font-semibold
            text-green-400
          "
        >
          +$
          {{
            Number(
              trade.netProfit,
            ).toFixed(2)
          }}
        </span>
      </div>
    </div>

    <div
      v-else
      class="
        h-[180px]

        flex
        flex-col

        items-center
        justify-center

        text-center
      "
    >
      <p
        class="
          text-white
          font-medium
        "
      >
        No trades executed yet
      </p>

      <p
        class="
          mt-2

          text-sm
          text-slate-500
        "
      >
        Waiting for arbitrage opportunities...
      </p>
    </div>
  </BaseCard>
</template>