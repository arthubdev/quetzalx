<script setup lang="ts">
const {
  data,
} = await useFetch(
  '/api/dashboard',
)

const trades =
  computed(() =>
    data.value?.trades
      ?.slice(0, 6) ?? [],
  )
</script>

<template>
  <section
    id="trades"
    class="
    reveal-section
      mx-auto

      max-w-7xl

      px-6
      py-32
    "
  >
    <div
      class="
        text-center
      "
    >
      <p
        class="
          text-sm
          font-semibold

          tracking-widest

          text-[#00C389]
        "
      >
        LIVE EXECUTIONS
      </p>

      <h2
        class="
          mt-4

          text-4xl
          font-bold

          md:text-6xl
        "
      >
        Recent Trades
      </h2>

      <p
        class="
          mx-auto

          mt-6

          max-w-3xl

          text-slate-400
        "
      >
        Real arbitrage trades
        executed by the
        Quetzal X engine.
      </p>
    </div>

    <div
      class="
        mt-20

        overflow-hidden

        rounded-3xl

        border
        border-slate-800

        bg-slate-900/70

        backdrop-blur
      "
    >
      <!-- HEADER -->

      <div
        class="
          grid

          grid-cols-4

          border-b
          border-slate-800

          px-6
          py-4

          text-xs

          uppercase

          tracking-wider

          text-slate-500
        "
      >
        <div>
          Buy
        </div>

        <div>
          Sell
        </div>

        <div>
          Volume
        </div>

        <div>
          Profit
        </div>
      </div>

      <!-- ROWS -->

      <div
        v-for="trade in trades"
        :key="trade.id"
        class="
          grid

          grid-cols-4

          border-b
          border-slate-800/50

          px-6
          py-5

          transition-all

          hover:bg-white/5
        "
      >
        <div>
          ${{ Number(
            trade.buyPrice,
          ).toLocaleString() }}
        </div>

        <div>
          ${{ Number(
            trade.sellPrice,
          ).toLocaleString() }}
        </div>

        <div>
          {{ trade.volumeBtc }}
          BTC
        </div>

        <div
          class="
            font-semibold

            text-[#00C389]
          "
        >
          +${{
            Number(
              trade.netProfit,
            ).toFixed(2)
          }}
        </div>
      </div>
    </div>
  </section>
</template>