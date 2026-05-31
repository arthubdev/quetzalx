<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data: opportunitiesResponse,
} = useFetch(
  '/api/opportunities/live',
  {
    server: false,
  },
)

const opportunities =
  computed(
    () =>
      opportunitiesResponse.value
        ?.opportunities ?? [],
  )

const topOpportunity =
  computed(() => {
    const profitable =
      opportunities.value.filter(
        (item: any) =>
          Number(
            item.netProfit,
          ) > 0,
      )

    if (!profitable.length) {
      return null
    }

    return profitable.sort(
      (
        a: any,
        b: any,
      ) =>
        Number(
          b.netProfit,
        ) -
        Number(
          a.netProfit,
        ),
    )[0]
  })

function exchangeLabel(
  value: string,
) {
  if (!value) {
    return 'N/A'
  }

  return value
    .replaceAll(
      '_',
      ' ',
    )
    .replace(
      /\b\w/g,
      (l) =>
        l.toUpperCase(),
    )
}
</script>

<template>
  <BaseCard>
    <div
      class="
        flex
        items-center
        justify-between

        mb-6
      "
    >
      <div>
        <h3
          class="
            text-lg
            font-semibold
          "
        >
          Top Opportunity
        </h3>

        <p
          class="
            text-sm
            text-slate-500
          "
        >
          Best live arbitrage route
        </p>
      </div>

      <span
        v-if="topOpportunity"
        class="
          rounded-full

          bg-green-500/10

          px-3
          py-1

          text-xs
          text-green-400
        "
      >
        LIVE
      </span>

      <span
        v-else
        class="
          rounded-full

          bg-slate-700/40

          px-3
          py-1

          text-xs
          text-slate-400
        "
      >
        MARKET EFFICIENT
      </span>
    </div>

    <!-- OPPORTUNITY FOUND -->

    <div
      v-if="topOpportunity"
      class="
        grid
        gap-6

        md:grid-cols-4
      "
    >
      <!-- BUY -->

      <div>
        <p
          class="
            text-xs
            uppercase
            tracking-wider

            text-slate-500
          "
        >
          Buy
        </p>

        <p
          class="
            mt-2

            text-xl
            font-semibold
          "
        >
          {{
            exchangeLabel(
              topOpportunity.buyExchange ||
              topOpportunity.buy ||
              topOpportunity.buyExchangeId,
            )
          }}
        </p>
      </div>

      <!-- SELL -->

      <div>
        <p
          class="
            text-xs
            uppercase
            tracking-wider

            text-slate-500
          "
        >
          Sell
        </p>

        <p
          class="
            mt-2

            text-xl
            font-semibold
          "
        >
          {{
            exchangeLabel(
              topOpportunity.sellExchange ||
              topOpportunity.sell ||
              topOpportunity.sellExchangeId,
            )
          }}
        </p>
      </div>

      <!-- SPREAD -->

      <div>
        <p
          class="
            text-xs
            uppercase
            tracking-wider

            text-slate-500
          "
        >
          Spread
        </p>

        <p
          class="
            mt-2

            text-xl
            font-semibold

            text-cyan-400
          "
        >
          {{
            Number(
              topOpportunity.spread,
            ).toFixed(2)
          }}%
        </p>
      </div>

      <!-- PROFIT -->

      <div>
        <p
          class="
            text-xs
            uppercase
            tracking-wider

            text-slate-500
          "
        >
          Net Profit
        </p>

        <p
          class="
            mt-2

            text-xl
            font-bold

            text-green-400
          "
        >
          +$
          {{
            Number(
              topOpportunity.netProfit,
            ).toFixed(2)
          }}
        </p>
      </div>
    </div>

    <!-- NO PROFITABLE ROUTES -->

    <div
      v-else
      class="
        py-10

        text-center
      "
    >
      <p
        class="
          text-xl
          font-semibold

          text-slate-200
        "
      >
        No Profitable Arbitrage Routes
      </p>

      <p
        class="
          mt-2

          text-slate-500
        "
      >
        Market spreads are currently
        too small to generate positive
        net profit after fees.
      </p>
    </div>
  </BaseCard>
</template>