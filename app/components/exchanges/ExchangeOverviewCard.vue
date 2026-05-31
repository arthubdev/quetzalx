<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const { data: exchangesResponse } = useFetch(
  '/api/exchanges',
  {
    server: false,
  },
)

const { data: walletsResponse } = useFetch(
  '/api/wallets',
  {
    server: false,
  },
)

const exchanges = computed(
  () =>
    exchangesResponse.value?.data ??
    [],
)

const wallets = computed(
  () =>
    walletsResponse.value?.data ??
    [],
)

const activeCount = computed(
  () =>
    exchanges.value.filter(
      (exchange: any) =>
        exchange.isActive,
    ).length,
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
</script>

<template>
  <BaseCard>
    <div
      class="
        grid
        gap-6
        md:grid-cols-3
      "
    >
      <div>
        <p class="text-sm text-slate-400">
          Exchanges
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{ exchanges.length }}
        </h3>
      </div>

      <div>
        <p class="text-sm text-slate-400">
          Active
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
            text-green-400
          "
        >
          {{ activeCount }}
        </h3>
      </div>

      <div>
        <p class="text-sm text-slate-400">
          Wallet Capital
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
            text-cyan-400
          "
        >
          $
          {{
            totalCapital.toLocaleString()
          }}
        </h3>
      </div>
    </div>
  </BaseCard>
</template>