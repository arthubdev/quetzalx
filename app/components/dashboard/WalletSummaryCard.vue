<script setup lang="ts">
const {
  data: walletsResponse,
} = await useFetch(
  '/api/wallets',
  {
    server: false,
  },
)

const {
  data: exchangesResponse,
} = await useFetch(
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
  exchangeId: string,
) {
  const exchange =
    exchanges.value.find(
      (
        item: any,
      ) =>
        item.id ===
        exchangeId,
    )

  return (
    exchange?.name ??
    'Unknown'
  )
}

function exchangeCode(
  exchangeId: string,
) {
  const exchange =
    exchanges.value.find(
      (
        item: any,
      ) =>
        item.id ===
        exchangeId,
    )

  return (
    exchange?.code ??
    ''
  )
}
</script>

<template>
  <BaseCard
    class="
      min-h-[220px]
    "
  >
    <h3
      class="
        text-lg
        font-semibold
      "
    >
      Wallets
    </h3>

    <div
      v-if="
        wallets.length
      "
      class="
        mt-5
        space-y-4
      "
    >
      <div
        v-for="wallet in wallets"
        :key="wallet.id"
        class="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            class="
              font-semibold
              text-white
            "
          >
            {{
              exchangeName(
                wallet.exchangeId,
              )
            }}
          </p>

          <p
            class="
              text-xs
              uppercase
              tracking-wide
              text-slate-500
            "
          >
            {{
              exchangeCode(
                wallet.exchangeId,
              )
            }}
          </p>
        </div>

        <div
          class="
            text-right
          "
        >
          <p
            class="
              font-semibold
              text-green-400
            "
          >
            $
            {{
              Number(
                wallet.usdtBalance,
              ).toLocaleString()
            }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="
        h-[180px]

        flex
        flex-col

        items-center
        justify-center

        text-center
      "
    >
      <p
        class="
          text-white
          font-medium
        "
      >
        No wallets available
      </p>

      <p
        class="
          mt-2

          text-sm
          text-slate-500
        "
      >
        Wallets will appear here automatically.
      </p>
    </div>
  </BaseCard>
</template>