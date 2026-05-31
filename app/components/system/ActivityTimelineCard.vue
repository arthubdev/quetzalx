<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/dashboard',
  {
    server: false,
  },
)

const events = computed(
  () =>
    data.value?.events ??
    [],
)

const recentEvents = computed(
  () =>
    events.value.slice(
      0,
      5,
    ),
)

function formatTime(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
  )
}

function badgeColor(
  level: string,
) {
  switch (level) {
    case 'error':
      return 'text-red-400'

    case 'warning':
      return 'text-yellow-400'

    default:
      return 'text-green-400'
  }
}
</script>

<template>
  <BaseCard>
    <div
      class="
        mb-6
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h3
          class="
            text-lg
            font-semibold
          "
        >
          Activity Timeline
        </h3>

        <p
          class="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Latest system activity
        </p>
      </div>

      <span
        class="
          text-xs
          text-slate-500
        "
      >
        {{ events.length }}
        events
      </span>
    </div>

    <template
      v-if="
        recentEvents.length
      "
    >
      <div
        class="
          space-y-4
        "
      >
        <div
          v-for="
            event in recentEvents
          "
          :key="event.id"
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
                bg-[#00C389]
              "
            />

            <div>
              <p
                class="
                  font-medium
                  text-white
                "
              >
                {{ event.message }}
              </p>

              <p
                class="
                  text-xs
                "
                :class="
                  badgeColor(
                    event.level,
                  )
                "
              >
                {{ event.source }}
              </p>
            </div>
          </div>

          <span
            class="
              text-xs
              text-slate-500
            "
          >
            {{
              formatTime(
                event.createdAt,
              )
            }}
          </span>
        </div>
      </div>

      <div
        v-if="
          events.length > 5
        "
        class="
          mt-6
          text-center
        "
      >
        <button
          class="
            rounded-lg
            border
            border-slate-700

            px-4
            py-2

            text-sm
            text-slate-400

            transition

            hover:border-cyan-400
            hover:text-cyan-400
          "
        >
          View All Logs
        </button>
      </div>
    </template>

    <div
      v-else
      class="
        flex
        flex-col
        items-center
        justify-center

        py-12
        text-center
      "
    >
      <div
        class="
          mb-4

          flex
          h-16
          w-16

          items-center
          justify-center

          rounded-full

          bg-slate-800
        "
      >
        <span
          class="
            text-2xl
          "
        >
          📋
        </span>
      </div>

      <h4
        class="
          text-lg
          font-medium
          text-white
        "
      >
        No Activity Yet
      </h4>

      <p
        class="
          mt-2
          text-sm
          text-slate-500
        "
      >
        System events will appear here.
      </p>
    </div>
  </BaseCard>
</template>