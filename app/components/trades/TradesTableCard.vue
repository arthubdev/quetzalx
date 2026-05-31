<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue'

import BaseCard from '@/components/ui/BaseCard.vue'

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

const trades =
  computed(
    () =>
      tradesResponse.value?.data ??
      [],
  )

const exchanges =
  computed(
    () =>
      exchangesResponse.value?.data ??
      [],
  )

const currentPage = ref(1)
const pageSize = 6
const selectedStatus = ref('all')
const searchRoute = ref('')

function exchangeName(id: string) {
  const exchange =
    exchanges.value.find(
      (item: any) =>
        item.id === id,
    )

  return (
    exchange?.name ??
    'Unknown'
  )
}

function formatDate(value: string) {
  return new Date(
    value,
  ).toLocaleString()
}

function spreadPercent(
  buyPrice: string,
  sellPrice: string,
) {
  const buy = Number(buyPrice)
  const sell = Number(sellPrice)

  if (!buy || !sell) {
    return '0.00'
  }

  return (
    ((sell - buy) / buy) * 100
  ).toFixed(2)
}

const filteredTrades =
  computed(() => {
    let result = [...trades.value]

    if (
      selectedStatus.value !== 'all'
    ) {
      result = result.filter(
        (trade: any) =>
          String(trade.status ?? '')
            .toLowerCase()
            .trim() ===
          selectedStatus.value,
      )
    }

    if (searchRoute.value.trim()) {
      const query =
        searchRoute.value
          .toLowerCase()
          .trim()

      result = result.filter(
        (trade: any) => {
          const route =
            `${exchangeName(trade.buyExchangeId)} → ${exchangeName(trade.sellExchangeId)}`.toLowerCase()

          return route.includes(query)
        },
      )
    }

    return result.sort(
      (a: any, b: any) =>
        new Date(
          b.executedAt,
        ).getTime() -
        new Date(
          a.executedAt,
        ).getTime(),
    )
  })

const totalPages =
  computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredTrades.value.length /
          pageSize,
      ),
    ),
  )

const paginatedTrades =
  computed(() => {
    const start =
      (currentPage.value - 1) *
      pageSize

    return filteredTrades.value.slice(
      start,
      start + pageSize,
    )
  })

watch(
  [selectedStatus, searchRoute],
  () => {
    currentPage.value = 1
  },
)

watch(
  filteredTrades,
  () => {
    if (
      currentPage.value >
      totalPages.value
    ) {
      currentPage.value =
        totalPages.value
    }
  },
)

function nextPage() {
  if (
    currentPage.value <
    totalPages.value
  ) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function statusLabel(status: string) {
  const value =
    String(status ?? '')
      .toLowerCase()
      .trim()

  if (value === 'executed') {
    return 'EXECUTED'
  }

  if (value === 'detected') {
    return 'DETECTED'
  }

  if (value === 'failed') {
    return 'FAILED'
  }

  return (
    value ? value.toUpperCase() : 'UNKNOWN'
  )
}

function statusClasses(status: string) {
  const value =
    String(status ?? '')
      .toLowerCase()
      .trim()

  if (value === 'executed') {
    return 'bg-green-500/20 text-green-400'
  }

  if (value === 'detected') {
    return 'bg-cyan-500/20 text-cyan-400'
  }

  if (value === 'failed') {
    return 'bg-red-500/20 text-red-400'
  }

  return 'bg-slate-700 text-slate-300'
}
</script>

<template>
  <BaseCard>
    <div
      class="
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
      "
    >
      <div>
        <h3
          class="
            text-lg
            font-semibold
          "
        >
          Trade History
        </h3>

        <p
          class="
            text-xs
            text-slate-400
          "
        >
          {{ filteredTrades.length }}
          trades
        </p>
      </div>

      <div
        class="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <input
          v-model="searchRoute"
          type="text"
          placeholder="Search route..."
          class="
            min-w-[220px]
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-slate-500
            focus:border-[#00C389]
          "
        >

        <select
          v-model="selectedStatus"
          class="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-2
            text-sm
            text-white
            outline-none
            transition
            focus:border-[#00C389]
          "
        >
          <option value="all">
            All
          </option>
          <option value="executed">
            Executed
          </option>
          <option value="detected">
            Detected
          </option>
          <option value="failed">
            Failed
          </option>
        </select>
      </div>
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
          min-w-[1000px]
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
              Route
            </th>

            <th class="pb-3 text-right">
              Spread %
            </th>

            <th class="pb-3 text-left">
              Volume
            </th>

            <th class="pb-3 text-right">
              Buy Price
            </th>

            <th class="pb-3 text-right">
              Sell Price
            </th>

            <th
              class="
                hidden
                xl:table-cell
                pb-3
                text-right
              "
            >
              Gross
            </th>

            <th
              class="
                hidden
                xl:table-cell
                pb-3
                text-right
              "
            >
              Fees
            </th>

            <th
              class="
                hidden
                xl:table-cell
                pb-3
                text-right
              "
            >
              Slippage
            </th>

            <th class="pb-3 text-right">
              Net Profit
            </th>

            <th class="pb-3 text-center">
              Status
            </th>

            <th class="pb-3 text-right">
              Executed
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="trade in paginatedTrades"
            :key="trade.id"
            class="
              border-b
              border-slate-900
              transition-colors
              hover:bg-slate-900/50
            "
          >
            <td
              class="
                py-4
                font-medium
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
            </td>

            <td
              class="
                py-4
                text-right
                text-cyan-400
              "
            >
              {{
                spreadPercent(
                  trade.buyPrice,
                  trade.sellPrice,
                )
              }}%
            </td>

            <td class="py-4">
              {{
                trade.volumeBtc
              }}
              BTC
            </td>

            <td class="py-4 text-right">
              $
              {{
                Number(
                  trade.buyPrice,
                ).toLocaleString()
              }}
            </td>

            <td class="py-4 text-right">
              $
              {{
                Number(
                  trade.sellPrice,
                ).toLocaleString()
              }}
            </td>

            <td
              class="
                hidden
                xl:table-cell
                py-4
                text-right
                text-cyan-400
              "
            >
              $
              {{
                Number(
                  trade.grossProfit,
                ).toFixed(2)
              }}
            </td>

            <td
              class="
                hidden
                xl:table-cell
                py-4
                text-right
                text-yellow-400
              "
            >
              $
              {{
                Number(
                  trade.tradingFees,
                ).toFixed(2)
              }}
            </td>

            <td
              class="
                hidden
                xl:table-cell
                py-4
                text-right
                text-orange-400
              "
            >
              $
              {{
                Number(
                  trade.slippageCost,
                ).toFixed(2)
              }}
            </td>

            <td
              class="
                py-4
                text-right
                font-semibold
              "
              :class="
                Number(
                  trade.netProfit,
                ) > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              "
            >
              $
              {{
                Number(
                  trade.netProfit,
                ).toFixed(2)
              }}
            </td>

            <td class="py-4 text-center">
              <span
                class="
                  rounded-full
                  px-2
                  py-1
                  text-xs
                  font-medium
                "
                :class="
                  statusClasses(
                    trade.status,
                  )
                "
              >
                {{
                  statusLabel(
                    trade.status,
                  )
                }}
              </span>
            </td>

            <td
              class="
                py-4
                text-right
                text-slate-400
              "
            >
              {{
                formatDate(
                  trade.executedAt,
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="
          mt-6
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Página
          {{ currentPage }}
          de
          {{ totalPages }}
        </p>

        <div class="flex gap-2">
          <button
            class="
              rounded-lg
              border
              border-slate-700
              px-4
              py-2
              transition
              hover:border-[#00C389]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Prev
          </button>

          <button
            class="
              rounded-lg
              border
              border-slate-700
              px-4
              py-2
              transition
              hover:border-[#00C389]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </BaseCard>
</template>