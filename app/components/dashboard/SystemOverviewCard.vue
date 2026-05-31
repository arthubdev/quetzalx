<script setup lang="ts">
const systems = [
  {
    name: 'Arbitrage Engine',
    status: 'ONLINE',
  },

  {
    name: 'Market Scanner',
    status: 'ONLINE',
  },

  {
    name: 'Database',
    status: 'HEALTHY',
  },

  {
    name: 'API Services',
    status: 'ACTIVE',
  },
]
</script>

<template>
  <BaseCard>
    <div
      class="
        flex
        items-center
        justify-between

        mb-6
      "
    >
      <div>
        <h3
          class="
            text-lg
            font-semibold
          "
        >
          System Overview
        </h3>

        <p
          class="
            text-sm
            text-slate-500
          "
        >
          Platform Infrastructure Status
        </p>
      </div>

      <span
        class="
          rounded-full

          bg-green-500/10

          px-3
          py-1

          text-xs
          font-medium

          text-green-400
        "
      >
        ALL SYSTEMS OPERATIONAL
      </span>
    </div>

    <div
      class="
        grid
        gap-4

        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <div
        v-for="system in systems"
        :key="system.name"
        class="
          rounded-xl

          border
          border-slate-800

          bg-slate-950/40

          p-4
        "
      >
        <div
          class="
            flex
            items-center
            justify-between
          "
        >
          <span
            class="
              text-sm
              text-slate-300
            "
          >
            {{ system.name }}
          </span>

          <div
            class="
              h-2
              w-2

              rounded-full

              bg-green-400

              animate-pulse
            "
          />
        </div>

        <p
          class="
            mt-3

            text-xs
            font-medium

            text-green-400
          "
        >
          {{ system.status }}
        </p>
      </div>
    </div>
  </BaseCard>
</template>