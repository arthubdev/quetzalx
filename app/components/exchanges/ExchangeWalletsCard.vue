<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

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

const wallets = computed(
  () =>
    walletsResponse.value?.data ??
    [],
)

const exchanges = computed(
  () =>
    exchangesResponse.value?.data ??
    [],
)

const totalCapital = computed(
  () =>
    wallets.value.reduce(
      (
        total: number,
        wallet: any,
      ) =>
        total +
        Number(
          wallet.usdtBalance,
        ),
      0,
    ),
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

const sortedWallets = computed(
  () =>
    [...wallets.value].sort(
      (
        a: any,
        b: any,
      ) =>
        Number(
          b.usdtBalance,
        ) -
        Number(
          a.usdtBalance,
        ),
    ),
)

function capitalPercentage(
  wallet: any,
) {
  if (
    totalCapital.value === 0
  ) {
    return '0.0'
  }

  return (
    (
      Number(
        wallet.usdtBalance,
      ) /
      totalCapital.value
    ) *
    100
  ).toFixed(1)
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
      Exchange Wallets
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

            <th class="pb-3 text-right">
              %
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="
              wallet in sortedWallets
            "
            :key="wallet.id"
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
                Number(
                  wallet.btcBalance,
                ).toFixed(8)
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

            <td
              class="
                py-4
                text-right
                text-cyan-400
                font-medium
              "
            >
              {{
                capitalPercentage(
                  wallet,
                )
              }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>