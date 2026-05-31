<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/market/state',
  {
    server: false,
    refresh: 3000,
  },
)

const quotes = computed(
  () =>
    data.value?.quotes ??
    [],
)

function latency(
  timestamp: string,
) {
  return (
    Date.now() -
    new Date(
      timestamp,
    ).getTime()
  )
}

function latencyColor(
  value: number,
) {
  if (value < 200) {
    return 'text-green-400'
  }

  if (value < 500) {
    return 'text-yellow-400'
  }

  return 'text-red-400'
}

function latencyBadge(
  value: number,
) {
  if (value < 200) {
    return 'bg-green-500'
  }

  if (value < 500) {
    return 'bg-yellow-500'
  }

  return 'bg-red-500'
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
        Feed Latency
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
        space-y-3
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
        <span
          class="
            font-medium
          "
        >
          {{ quote.exchangeCode }}
        </span>

        <div
          class="
            flex
            items-center
            gap-3
          "
        >
          <div
            class="
              h-2.5
              w-2.5
              rounded-full
            "
            :class="
              latencyBadge(
                latency(
                  quote.timestamp,
                ),
              )
            "
          />

          <span
            :class="
              latencyColor(
                latency(
                  quote.timestamp,
                ),
              )
            "
          >
            {{
              latency(
                quote.timestamp,
              )
            }}
            ms
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>