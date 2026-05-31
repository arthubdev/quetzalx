<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data: walletsResponse,
} = useFetch(
  '/api/wallets',
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

const wallets =
  computed(
    () =>
      walletsResponse.value?.data ??
      [],
  )

const exchanges =
  computed(
    () =>
      exchangesResponse.value?.data ??
      [],
  )

function exchangeName(
  id: string,
) {
  const exchange =
    exchanges.value.find(
      (
        item: any,
      ) =>
        item.id === id,
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
      Wallet Balances
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
              BTC
            </th>

            <th class="pb-3 text-right">
              USDT
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="wallet in wallets"
            :key="wallet.id"
            class="
              border-b
              border-slate-900
            "
          >
            <td class="py-4">
              {{
                exchangeName(
                  wallet.exchangeId,
                )
              }}
            </td>

            <td
              class="
                py-4
                text-right
              "
            >
              {{
                wallet.btcBalance
              }}
            </td>

            <td
              class="
                py-4
                text-right
                font-medium
                text-green-400
              "
            >
              $
              {{
                Number(
                  wallet.usdtBalance,
                ).toLocaleString()
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>