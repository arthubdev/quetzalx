<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/market/state',
  {
    server: false,
    refresh: 3000,
  },
)

const quotes =
  computed(
    () =>
      data.value?.quotes ??
      [],
  )

function statusColor(
  timestamp: string,
) {
  const latency =
    Date.now() -
    new Date(
      timestamp,
    ).getTime()

  if (
    latency < 10000
  ) {
    return 'bg-green-500'
  }

  if (
    latency < 30000
  ) {
    return 'bg-yellow-500'
  }

  return 'bg-red-500'
}

function statusText(
  timestamp: string,
) {
  const latency =
    Date.now() -
    new Date(
      timestamp,
    ).getTime()

  if (
    latency < 10000
  ) {
    return 'Connected'
  }

  if (
    latency < 30000
  ) {
    return 'Delayed'
  }

  return 'Offline'
}
</script>

<template>
  <BaseCard>
    <div
      class="
        flex
        items-center
        justify-between
      "
    >
      <h3
        class="
          text-lg
          font-semibold
        "
      >
        Exchange Status
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
        mt-6
        space-y-4
      "
    >
      <div
        v-for="quote in quotes"
        :key="quote.exchangeCode"
        class="
          flex
          items-center
          justify-between

          rounded-lg

          border
          border-slate-800

          px-4
          py-3
        "
      >
        <div>
          <p
            class="
              font-medium
            "
          >
            {{
              quote.exchangeCode
            }}
          </p>

          <p
            class="
              text-xs
              text-slate-400
            "
          >
            {{
              quote.timestamp
            }}
          </p>
        </div>

        <div
          class="
            flex
            items-center
            gap-2
          "
        >
          <div
            class="
              h-3
              w-3
              rounded-full
            "
            :class="
              statusColor(
                quote.timestamp,
              )
            "
          />

          <span
            class="
              text-sm
            "
          >
            {{
              statusText(
                quote.timestamp,
              )
            }}
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>