<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/metrics',
  {
    server: false,
  },
)
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
      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Total Trades
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{
            data?.metrics
              ?.total_trades ?? 0
          }}
        </h3>
      </div>

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Total Profit
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          $
          {{
            data?.metrics
              ?.total_profit ?? 0
          }}
        </h3>
      </div>

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Win Rate
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{
            Number(
              data?.metrics
                ?.win_rate ?? 0,
            ).toFixed(2)
          }}%
        </h3>
      </div>

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Best Trade
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          $
          {{
            data?.metrics
              ?.best_trade ?? 0
          }}
        </h3>
      </div>
    </div>
  </BaseCard>
</template>