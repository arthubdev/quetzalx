<script setup lang="ts">

const props =
  defineProps<{
    title: string
    subtitle?: string
  }>()

const {
  data: exchanges,
} = useFetch(
  '/api/exchanges',
)

const {
  data: opportunities,
} = useFetch(
  '/api/opportunities/live',
)

const {
  data: dashboard,
} = useFetch(
  '/api/dashboard',
)

const exchangesCount =
  computed(
    () =>
      exchanges.value
        ?.count ?? 0,
  )

const opportunitiesCount =
  computed(
    () =>
      opportunities.value
        ?.opportunities
        ?.length ?? 0,
  )

const tradesCount =
  computed(
    () =>
      dashboard.value
        ?.metrics
        ?.total_trades ?? 0,
  )
</script>

<template>
  <div
    class="
      mb-6
    "
  >
    <h2
      class="
        text-3xl
        font-bold
      "
    >
      {{ title }}
    </h2>

    <p
      v-if="subtitle"
      class="
        mt-1
        text-slate-400
      "
    >
      {{ subtitle }}
    </p>

    <div
      class="
        mt-5

        flex
        flex-wrap
        items-center

        gap-3

        text-sm
      "
    >
      <span
        class="
          flex
          items-center
          gap-2

          rounded-full

          bg-green-500/10

          px-3
          py-1

          text-green-400
          font-medium
        "
      >
        <span
          class="
            h-2
            w-2

            rounded-full

            bg-green-400

            animate-pulse
          "
        />

        LIVE
      </span>

      <span
        class="
          rounded-full

          bg-slate-800

          px-3
          py-1

          text-slate-300
        "
      >
        {{ exchangesCount }}
        Exchanges
      </span>

      <span
        class="
          rounded-full

          bg-slate-800

          px-3
          py-1

          text-slate-300
        "
      >
        {{ opportunitiesCount }}
        Opportunities
      </span>

      <span
        class="
          rounded-full

          bg-slate-800

          px-3
          py-1

          text-slate-300
        "
      >
        {{ tradesCount }}
        Trades
      </span>
    </div>
  </div>
</template>