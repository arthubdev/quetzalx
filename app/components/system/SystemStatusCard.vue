<script setup lang="ts">
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

const marketFeedOnline =
  computed(
    () =>
      (
        exchanges.value?.count ??
        0
      ) > 0,
  )

const opportunityEngineOnline =
  computed(
    () =>
      (
        opportunities.value?.opportunities
          ?.length ?? 0
      ) >= 0,
  )

const tradeEngineOnline =
  computed(
    () =>
      dashboard.value?.success ===
      true,
  )

const databaseOnline =
  computed(
    () =>
      dashboard.value?.success ===
      true,
  )
</script>

<template>
  <div
    class="
      rounded-2xl
      border
      border-slate-800
      bg-slate-900
      p-6
    "
  >
    <div
      class="
        flex
        items-center
        justify-between

        mb-5
      "
    >
      <h3
        class="
          text-lg
          font-semibold
        "
      >
        System Status
      </h3>

      <span
        class="
          text-xs
          text-green-400
        "
      >
        LIVE
      </span>
    </div>

    <div
      class="
        grid
        gap-4

        md:grid-cols-2
      "
    >
      <div
        class="
          flex
          items-center
          justify-between

          rounded-xl

          border
          border-slate-800

          px-4
          py-3
        "
      >
        <span>
          Market Feed
        </span>

        <span
          class="
            rounded-full

            bg-green-500/10

            px-3
            py-1

            text-xs
            text-green-400
          "
        >
          {{
            marketFeedOnline
              ? 'ONLINE'
              : 'OFFLINE'
          }}
        </span>
      </div>

      <div
        class="
          flex
          items-center
          justify-between

          rounded-xl

          border
          border-slate-800

          px-4
          py-3
        "
      >
        <span>
          Opportunity Engine
        </span>

        <span
          class="
            rounded-full

            bg-green-500/10

            px-3
            py-1

            text-xs
            text-green-400
          "
        >
          {{
            opportunityEngineOnline
              ? 'RUNNING'
              : 'STOPPED'
          }}
        </span>
      </div>

      <div
        class="
          flex
          items-center
          justify-between

          rounded-xl

          border
          border-slate-800

          px-4
          py-3
        "
      >
        <span>
          Trade Engine
        </span>

        <span
          class="
            rounded-full

            bg-green-500/10

            px-3
            py-1

            text-xs
            text-green-400
          "
        >
          {{
            tradeEngineOnline
              ? 'READY'
              : 'OFFLINE'
          }}
        </span>
      </div>

      <div
        class="
          flex
          items-center
          justify-between

          rounded-xl

          border
          border-slate-800

          px-4
          py-3
        "
      >
        <span>
          Database
        </span>

        <span
          class="
            rounded-full

            bg-green-500/10

            px-3
            py-1

            text-xs
            text-green-400
          "
        >
          {{
            databaseOnline
              ? 'ACTIVE'
              : 'DOWN'
          }}
        </span>
      </div>
    </div>
  </div>
</template>