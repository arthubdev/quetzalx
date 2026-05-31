<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/market/state',
  {
    server: false,
    refresh: 1000,
  },
)

const quotes =
  computed(
    () =>
      data.value?.quotes ??
      [],
  )

const activeQuotes =
  computed(() =>
    quotes.value.filter(
      (quote: any) =>
        Number(
          quote.bid,
        ) > 0 &&
        Number(
          quote.ask,
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
        Live Market
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

    <template
      v-if="activeQuotes.length"
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
              <th
                class="
                  pb-3
                  text-left
                "
              >
                Exchange
              </th>

              <th
                class="
                  pb-3
                  text-right
                "
              >
                Bid
              </th>

              <th
                class="
                  pb-3
                  text-right
                "
              >
                Ask
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="quote in activeQuotes"
              :key="
                quote.exchangeCode
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
                {{
                  quote.exchangeCode
                }}
              </td>

              <td
                class="
                  py-3
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
                  py-3
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
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <div
      v-else
      class="
        flex

        min-h-[320px]

        items-center
        justify-center

        text-center
      "
    >
      <div>
        <p
          class="
            text-xl
            font-semibold
          "
        >
          No Market Data
        </p>

        <p
          class="
            mt-2

            text-slate-500
          "
        >
          Waiting for exchange feeds.
        </p>
      </div>
    </div>
  </BaseCard>
</template>