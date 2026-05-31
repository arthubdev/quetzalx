<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/opportunities/live',
  {
    server: false,
    refresh: 1000,
  },
)

const opportunities =
  computed(
    () =>
      data.value?.opportunities ??
      [],
  )

const profitableOpportunities =
  computed(() =>
    opportunities.value.filter(
      (item: any) =>
        Number(
          item.netProfit,
        ) > 0,
    ),
  )
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
        Live Arbitrage Opportunities
      </h3>

      <span
        class="
          text-xs
          text-green-400
          font-medium
        "
      >
        LIVE
      </span>
    </div>

    <!-- HAY OPORTUNIDADES -->

    <template
      v-if="
        profitableOpportunities.length
      "
    >
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
                Buy
              </th>

              <th class="pb-3 text-left">
                Sell
              </th>

              <th class="pb-3 text-right">
                Spread
              </th>

              <th class="pb-3 text-right">
                Net
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="
                opportunity
                in profitableOpportunities
              "
              :key="
                `${opportunity.buyExchange}-${opportunity.sellExchange}`
              "
              class="
                border-b
                border-slate-900
              "
            >
              <td
                class="
                  py-3
                  font-medium
                "
              >
                {{ opportunity.buyExchange }}
              </td>

              <td
                class="
                  py-3
                  font-medium
                "
              >
                {{ opportunity.sellExchange }}
              </td>

              <td
                class="
                  py-3
                  text-right
                "
              >
                {{
                  Number(
                    opportunity.spread,
                  ).toFixed(2)
                }}
              </td>

              <td
                class="
                  py-3
                  text-right

                  text-green-400
                "
              >
                +$
                {{
                  Number(
                    opportunity.netProfit,
                  ).toFixed(2)
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- NO HAY OPORTUNIDADES -->

    <div
      v-else
      class="
        flex

        min-h-[260px]

        items-center
        justify-center

        text-center
      "
    >
      <div>
        <p
          class="
            text-2xl
            font-semibold
          "
        >
          Market Efficient
        </p>

        <p
          class="
            mt-3

            text-slate-500
          "
        >
          No actionable arbitrage
          opportunities detected.
        </p>
      </div>
    </div>
  </BaseCard>
</template>