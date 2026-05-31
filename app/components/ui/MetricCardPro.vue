<script setup lang="ts">
import {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
} from 'lucide-vue-next'

const props = defineProps<{
  title: string
  value: string | number
  change: string
  color: 'green' | 'purple' | 'blue' | 'yellow'
  icon:
    | 'profit'
    | 'trades'
    | 'opportunities'
    | 'winrate'
  series: number[]
}>()

const iconComponent =
  computed(() => {
    switch (props.icon) {
      case 'trades':
        return TrendingUp

      case 'opportunities':
        return Target

      case 'winrate':
        return Activity

      default:
        return DollarSign
    }
  })

const theme =
  computed(() => {
    switch (props.color) {
      case 'purple':
        return {
          color: '#A855F7',
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border:
            'border-purple-500/20',
        }

      case 'blue':
        return {
          color: '#06B6D4',
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          border:
            'border-cyan-500/20',
        }

      case 'yellow':
        return {
          color: '#EAB308',
          text:
            'text-yellow-400',
          bg:
            'bg-yellow-500/10',
          border:
            'border-yellow-500/20',
        }

      default:
        return {
          color: '#00C389',
          text:
            'text-[#00C389]',
          bg:
            'bg-[#00C389]/10',
          border:
            'border-[#00C389]/20',
        }
    }
  })

const hasEnoughHistory =
  computed(
    () =>
      props.series.length >= 5,
  )

const chartOptions =
  computed(() => ({
    chart: {
      sparkline: {
        enabled: true,
      },

      toolbar: {
        show: false,
      },

      background:
        'transparent',

      offsetY: -8,
    },

    tooltip: {
      enabled: false,
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      show: false,
    },

    markers: {
      size: 0,
    },

    stroke: {
      curve: 'smooth',
      width: 2.5,
      lineCap: 'round',
    },

    colors: [
      theme.value.color,
    ],

    xaxis: {
      labels: {
        show: false,
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },
  }))

const chartSeries =
  computed(() => [
    {
      data:
        props.series,
    },
  ])
</script>

<template>
  <div
    class="
      rounded-2xl
      border
      border-slate-800

      bg-[#091325]

      p-5

      h-[190px]

      overflow-hidden

      transition-all
      duration-300

      hover:border-slate-700
    "
  >
    <div
      class="
        flex
        items-start
        justify-between
      "
    >
      <div>
        <p
          class="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-slate-500
          "
        >
          {{ title }}
        </p>

        <h2
          class="
            mt-3
            text-4xl
            font-bold
          "
          :class="
            theme.text
          "
        >
          {{ value }}
        </h2>

        <div
          class="
            mt-3
            flex
            items-center
            gap-2
          "
        >
          <span
            class="
              text-sm
              font-medium
            "
            :class="
              theme.text
            "
          >
            {{ change }}
          </span>

          <span
            class="
              text-xs
              text-slate-500
            "
          >
            24H
          </span>
        </div>
      </div>

      <div
        class="
          flex
          items-center
          justify-center

          h-14
          w-14

          rounded-xl
          border
        "
        :class="[
          theme.bg,
          theme.border,
        ]"
      >
        <component
          :is="
            iconComponent
          "
          class="
            h-6
            w-6
          "
          :class="
            theme.text
          "
        />
      </div>
    </div>

    <div
      class="
        mt-5
        overflow-hidden
      "
    >
      <ClientOnly>
        <ApexChart
          v-if="
            hasEnoughHistory
          "
          type="line"
          height="45"
          :options="
            chartOptions
          "
          :series="
            chartSeries
          "
        />

        <div
          v-else
          class="
            h-[45px]

            flex
            items-center

            text-xs
            text-slate-500
          "
        >
          Accumulating historical snapshots...
        </div>
      </ClientOnly>
    </div>
  </div>
</template>