<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/market/state',
  {
    server: false,
    refresh: 1000,
  },
)

const quotes = computed(
  () =>
    data.value?.quotes ??
    [],
)

const validQuotes = computed(
  () =>
    quotes.value.filter(
      (
        quote: any,
      ) =>
        Number(
          quote.bid,
        ) > 0 &&
        Number(
          quote.ask,
        ) > 0,
    ),
)

const offlineQuotes = computed(
  () =>
    quotes.value.filter(
      (
        quote: any,
      ) =>
        Number(
          quote.bid,
        ) <= 0 ||
        Number(
          quote.ask,
        ) <= 0,
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
        Live Market Feed
      </h3>

      <span
        class="
          text-xs
          text-green-400
        "
      >
        LIVE
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
            <th class="pb-3 text-left">
              Exchange
            </th>

            <th class="pb-3 text-right">
              Bid
            </th>

            <th class="pb-3 text-right">
              Ask
            </th>

            <th class="pb-3 text-right">
              Spread
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="quote in validQuotes"
            :key="quote.exchangeCode"
            class="
              border-b
              border-slate-900
            "
          >
            <td
              class="
                py-4
                font-medium
              "
            >
              {{ quote.exchangeCode }}
            </td>

            <td
              class="
                py-4
                text-right
                text-green-400
              "
            >
              {{
                Number(
                  quote.bid,
                ).toLocaleString()
              }}
            </td>

            <td
              class="
                py-4
                text-right
                text-red-400
              "
            >
              {{
                Number(
                  quote.ask,
                ).toLocaleString()
              }}
            </td>

            <td
              class="
                py-4
                text-right
                text-cyan-400
              "
            >
              {{
                (
                  Number(
                    quote.ask,
                  ) -
                  Number(
                    quote.bid,
                  )
                ).toFixed(2)
              }}
            </td>
          </tr>

          <tr
            v-for="quote in offlineQuotes"
            :key="`${quote.exchangeCode}-offline`"
            class="
              border-b
              border-slate-900
            "
          >
            <td
              class="
                py-4
                font-medium
              "
            >
              {{ quote.exchangeCode }}
            </td>

            <td
              colspan="3"
              class="
                py-4
                text-right
                text-yellow-400
              "
            >
              No Market Data
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>