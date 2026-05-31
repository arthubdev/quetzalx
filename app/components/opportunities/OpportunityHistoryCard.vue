<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/opportunities',
  {
    server: false,
  },
)

const opportunities =
  computed(
    () =>
      data.value?.data ??
      [],
  )

function safeNumber(
  value: unknown,
) {
  const num =
    Number(value)

  return Number.isFinite(num)
    ? num
    : 0
}
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
        Opportunity History
      </h3>

      <span
        class="
          text-xs
          text-slate-400
        "
      >
        {{
          opportunities.length
        }}
        records
      </span>
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
            <th
              class="
                pb-3
                text-left
              "
            >
              Buy Exchange
            </th>

            <th
              class="
                pb-3
                text-left
              "
            >
              Sell Exchange
            </th>

            <th
              class="
                pb-3
                text-right
              "
            >
              Price Difference
            </th>

            <th
              class="
                pb-3
                text-right
              "
            >
              Estimated Profit
            </th>

            <th
              class="
                pb-3
                text-center
              "
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="opportunity in opportunities"
            :key="opportunity.id"
            class="
              border-b
              border-slate-900
            "
          >
            <!-- BUY -->

            <td
              class="
                py-3
                font-medium

                text-slate-300
              "
            >
              {{
                opportunity.buyExchange ??
                opportunity.buyExchangeId?.slice(
                  0,
                  8,
                ) ??
                '-'
              }}
            </td>

            <!-- SELL -->

            <td
              class="
                py-3
                font-medium

                text-slate-300
              "
            >
              {{
                opportunity.sellExchange ??
                opportunity.sellExchangeId?.slice(
                  0,
                  8,
                ) ??
                '-'
              }}
            </td>

            <!-- PRICE DIFF -->

            <td
              class="
                py-3
                text-right

                text-cyan-400
              "
            >
              $
              {{
                safeNumber(
                  opportunity.spread,
                ).toFixed(2)
              }}
            </td>

            <!-- ESTIMATED PROFIT -->

            <td
              class="
                py-3
                text-right
                font-medium
              "
              :class="
                safeNumber(
                  opportunity.estimatedProfit,
                ) > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              $
              {{
                safeNumber(
                  opportunity.estimatedProfit,
                ).toFixed(2)
              }}
            </td>

            <!-- STATUS -->

            <td
              class="
                py-3
                text-center
              "
            >
              <span
                class="
                  rounded-full

                  px-3
                  py-1

                  text-xs
                  font-medium
                "
                :class="{
                  'bg-green-500/20 text-green-400':
                    opportunity.status === 'executed',

                  'bg-cyan-500/20 text-cyan-400':
                    opportunity.status === 'detected',

                  'bg-slate-700 text-slate-300':
                    ![
                      'executed',
                      'detected',
                    ].includes(
                      opportunity.status,
                    ),
                }"
              >
                {{
                  (
                    opportunity.status ??
                    'unknown'
                  ).toUpperCase()
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>