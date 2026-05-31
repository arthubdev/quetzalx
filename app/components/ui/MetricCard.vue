<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const props = defineProps<{
  title: string
  value: string | number
  change?: string
  color?: 'green' | 'purple' | 'blue' | 'yellow'
}>()

const theme = computed(() => {
  switch (props.color) {
    case 'purple':
      return {
        text: 'text-purple-400',
        border: 'border-purple-500/20',
        bg: 'bg-purple-500/10',
      }

    case 'blue':
      return {
        text: 'text-cyan-400',
        border: 'border-cyan-500/20',
        bg: 'bg-cyan-500/10',
      }

    case 'yellow':
      return {
        text: 'text-yellow-400',
        border: 'border-yellow-500/20',
        bg: 'bg-yellow-500/10',
      }

    default:
      return {
        text: 'text-green-400',
        border: 'border-green-500/20',
        bg: 'bg-green-500/10',
      }
  }
})
</script>

<template>
  <BaseCard
    class="
      relative
      overflow-hidden
      min-h-[240px]
    "
  >
    <div
      class="
        flex
        justify-between
        items-start
      "
    >
      <div>
        <p
          class="
            text-xs
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          {{ title }}
        </p>

        <h3
          class="
            mt-4
            text-5xl
            font-bold
          "
          :class="theme.text"
        >
          {{ value }}
        </h3>

        <p
          class="
            mt-4
            text-sm
          "
        >
          <span
            :class="theme.text"
          >
            {{ change }}
          </span>

          <span
            class="
              text-slate-500
            "
          >
            vs yesterday
          </span>
        </p>
      </div>

      <div
        class="
          flex
          items-center
          justify-center

          h-16
          w-16

          rounded-full
          border
        "
        :class="[
          theme.border,
          theme.bg,
        ]"
      >
        <div
          class="
            h-8
            w-8
            rounded-full
          "
          :class="theme.bg"
        />
      </div>
    </div>

    <!-- Sparkline fake -->

    <div
      class="
        absolute
        bottom-0
        left-0
        right-0

        h-24
        opacity-80
      "
    >
      <svg
        viewBox="0 0 300 100"
        class="
          w-full
          h-full
        "
      >
        <path
          d="
          M0,80
          L20,75
          L40,65
          L60,72
          L80,55
          L100,58
          L120,48
          L140,52
          L160,38
          L180,42
          L200,35
          L220,28
          L240,40
          L260,32
          L280,20
          L300,10
          "
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          :class="theme.text"
        />
      </svg>
    </div>
  </BaseCard>
</template>