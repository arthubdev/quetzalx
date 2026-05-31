<script setup lang="ts">
const {
  data: dashboard,
  pending,
} = await useFetch(
  '/api/dashboard',
)

const metrics =
  computed(() => [
    {
      value:
        dashboard.value?.metrics
          ?.total_opportunities ?? 0,

      label:
        'Opportunities Detected',
    },

    {
      value:
        dashboard.value?.metrics
          ?.total_trades ?? 0,

      label:
        'Executed Trades',
    },

    {
      value: `$${Number(
        dashboard.value?.metrics
          ?.total_profit ?? 0,
      ).toLocaleString()}`,

      label:
        'Captured Profit',
    },

    {
      value: `${Number(
        dashboard.value?.metrics
          ?.win_rate ?? 0,
      ).toFixed(1)}%`,

      label:
        'Win Rate',
    },
  ])
</script>

<template>
  <section
    id="metrics"
    class="
    reveal-section
      mx-auto

      max-w-7xl

      px-6
      py-24
    "
  >
    <div
      class="
        mb-16

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
        LIVE PLATFORM METRICS
      </p>

      <h2
        class="
          mt-4

          text-4xl
          font-bold

          md:text-6xl
        "
      >
        Real-Time Performance
      </h2>

      <p
        class="
          mx-auto

          mt-6

          max-w-3xl

          text-lg
          text-slate-400
        "
      >
        Live metrics generated
        directly from the
        Quetzal X platform.
      </p>
    </div>

    <div
      v-if="pending"
      class="
        text-center

        text-slate-500
      "
    >
      Loading metrics...
    </div>

    <div
      v-else
      class="
        grid
        gap-6

        md:grid-cols-2

        xl:grid-cols-4
      "
    >
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="
          rounded-3xl

          border
          border-slate-800

          bg-slate-900/70

          p-8

          backdrop-blur

          transition-all

          hover:border-[#00C389]/40
          hover:shadow-[0_0_30px_rgba(0,195,137,0.08)]
        "
      >
        <p
          class="
            text-5xl
            font-bold

            text-[#00C389]
          "
        >
          {{ metric.value }}
        </p>

        <p
          class="
            mt-4

            text-slate-400
          "
        >
          {{ metric.label }}
        </p>
      </div>
    </div>
  </section>
</template>