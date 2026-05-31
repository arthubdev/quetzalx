<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import BaseCard from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/wallet-transactions',
  {
    server: false,
  },
)

const search = ref('')
const typeFilter = ref<'all' | 'credit' | 'debit'>('all')

const currentPage = ref(1)
const pageSize = 8

const transactions = computed(
  () =>
    data.value?.data ?? [],
)

const filteredTransactions = computed(() => {
  return transactions.value.filter((item: any) => {
    const asset = String(item.asset ?? '').toLowerCase()
    const transactionType = String(item.transactionType ?? '').toLowerCase()

    const matchesSearch =
      !search.value ||
      asset.includes(search.value.toLowerCase().trim())

    const matchesType =
      typeFilter.value === 'all' ||
      transactionType === typeFilter.value

    return matchesSearch && matchesType
  })
})

const sortedTransactions = computed(() =>
  [...filteredTransactions.value].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  ),
)

const totalPages = computed(() =>
  sortedTransactions.value.length === 0
    ? 0
    : Math.ceil(sortedTransactions.value.length / pageSize),
)

const paginatedTransactions = computed(() => {
  if (totalPages.value === 0) {
    return []
  }

  const start = (currentPage.value - 1) * pageSize

  return sortedTransactions.value.slice(start, start + pageSize)
})

const isEmpty = computed(
  () => sortedTransactions.value.length === 0,
)

watch([search, typeFilter], () => {
  currentPage.value = 1
})

watch(totalPages, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(totalPages.value, 1)
  }
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleString()
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
          Wallet Transactions
        </h3>

        <p
          class="
            text-sm
            text-slate-400
          "
        >
          {{ filteredTransactions.length }}
          records
        </p>
      </div>

      <div
        class="
          flex
          flex-wrap
          gap-3
        "
      >
        <input
          v-model="search"
          type="text"
          placeholder="Search asset..."
          class="
            min-w-[220px]
            rounded-xl

            border
            border-cyan-500

            bg-transparent

            px-4
            py-2

            outline-none
            placeholder:text-slate-500
          "
        >

        <select
          v-model="typeFilter"
          class="
            rounded-xl

            border
            border-slate-700

            bg-slate-900

            px-4
            py-2

            outline-none
          "
        >
          <option value="all">
            All
          </option>

          <option value="credit">
            Credit
          </option>

          <option value="debit">
            Debit
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
              Asset
            </th>

            <th class="pb-3 text-right">
              Amount
            </th>

            <th class="pb-3 text-center">
              Type
            </th>

            <th class="pb-3 text-right">
              Date
            </th>
          </tr>
        </thead>

        <tbody v-if="!isEmpty">
          <tr
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            class="
              border-b
              border-slate-900
            "
          >
            <td class="py-4">
              {{ transaction.asset }}
            </td>

            <td
              class="
                py-4
                text-right
              "
            >
              {{
                Number(
                  transaction.amount,
                ).toLocaleString()
              }}
            </td>

            <td
              class="
                py-4
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
                :class="
                  String(
                    transaction.transactionType,
                  ).toLowerCase() === 'credit'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                "
              >
                {{
                  transaction.transactionType
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
                  transaction.createdAt,
                )
              }}
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td
              colspan="4"
              class="
                py-16
                text-center
              "
            >
              <div
                class="
                  flex
                  flex-col
                  items-center
                  gap-3
                "
              >
              <Icon
                name="heroicons:banknotes"
                class="
                  h-12
                  w-12
                  text-cyan-400
                "
              />

                <h4
                  class="
                    text-lg
                    font-semibold
                  "
                >
                  No wallet transactions yet
                </h4>

                <p
                  class="
                    max-w-md
                    text-sm
                    text-slate-500
                  "
                >
                  Transactions generated by
                  arbitrage executions will
                  appear here.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isEmpty"
      class="
        mt-8
        flex
        items-center
        justify-between
      "
    >
      <p class="text-slate-400">
        Página
        {{ currentPage }}
        de
        {{ totalPages }}
      </p>

      <div class="flex gap-3">
        <button
          class="
            rounded-xl
            border
            border-slate-700
            px-4
            py-2
            transition
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
            rounded-xl
            border
            border-slate-700
            px-4
            py-2
            transition
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          :disabled="currentPage >= totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </BaseCard>
</template>