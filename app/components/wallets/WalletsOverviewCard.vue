<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/wallets',
  {
    server: false,
  },
)

const wallets =
  computed(
    () =>
      data.value?.data ?? [],
  )

const totalUsdt =
  computed(() =>
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

const totalBtc =
  computed(() =>
    wallets.value.reduce(
      (
        total: number,
        wallet: any,
      ) =>
        total +
        Number(
          wallet.btcBalance,
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
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Active Wallets
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{
            wallets.length
          }}
        </h3>
      </div>

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          Total Capital
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          $
          {{
            totalUsdt.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              },
            )
          }}
        </h3>
      </div>

      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          BTC Holdings
        </p>

        <h3
          class="
            mt-2
            text-3xl
            font-bold
          "
        >
          {{
            totalBtc.toFixed(8)
          }}
          BTC
        </h3>
      </div>
    </div>
  </BaseCard>
</template>