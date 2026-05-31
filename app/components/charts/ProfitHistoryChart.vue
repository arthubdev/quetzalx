<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/metrics/history',
)

const history =
  computed(
    () =>
      data.value?.data ??
      [],
  )

const snapshotCount =
  computed(
    () =>
      history.value.length,
  )

const enoughData =
  computed(
    () =>
      snapshotCount.value >= 5,
  )

const currentProfit =
  computed(() => {
    const latest =
      history.value.at(-1)

    return Number(
      latest?.totalProfit ??
      0,
    )
  })

const series =
  computed(() => [
    {
      name:
        'Profit',

      data:
        history.value.map(
          (
            item: any,
          ) =>
            Number(
              item.totalProfit,
            ),
        ),
    },
  ])

const options =
  computed(() => ({
    chart: {
      toolbar: {
        show: false,
      },

      background:
        'transparent',
    },

    colors: [
      '#00C389',
    ],

    fill: {
      type: 'gradient',

      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0,
      },
    },

    theme: {
      mode: 'dark',
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: 'smooth',
      width: 3,
    },

    grid: {
      borderColor:
        '#1E293B',
    },

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
      labels: {
        formatter: (
          value: number,
        ) =>
          `$${value.toFixed(
            0,
          )}`,
      },
    },

    tooltip: {
      theme: 'dark',
    },

    legend: {
      show: false,
    },
  }))
</script>

<template>
  <BaseCard>
    <div
      class="
        flex
        items-start
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
          Profit History
        </h3>

        <p
          class="
            text-sm
            text-slate-500
          "
        >
          Cumulative Profit
        </p>
      </div>

      <div
        class="
          text-right
        "
      >
        <p
          class="
            text-xs
            text-slate-500
          "
        >
          Net Profit
        </p>

        <p
          class="
            text-xl
            font-bold
            text-[#00C389]
          "
        >
          +${{
            currentProfit.toFixed(
              2,
            )
          }}
        </p>
      </div>
    </div>

    <ClientOnly>
      <ApexChart
        v-if="enoughData"
        type="area"
        height="220"
        :options="options"
        :series="series"
      />

      <div
        v-else
        class="
          h-[220px]

          flex
          flex-col

          items-center
          justify-center

          text-center
        "
      >
        <div
          class="
            h-12
            w-12

            rounded-full

            bg-[#00C389]/10

            flex
            items-center
            justify-center

            mb-4
          "
        >
          <div
            class="
              h-3
              w-3

              rounded-full

              bg-[#00C389]

              animate-pulse
            "
          />
        </div>

        <p
          class="
            text-white
            font-medium
          "
        >
          Accumulating historical snapshots...
        </p>

        <p
          class="
            mt-2

            text-sm
            text-slate-500
          "
        >
          {{ snapshotCount }}
          snapshots collected
        </p>

        <p
          class="
            mt-1

            text-xs
            text-[#00C389]
          "
        >
          LIVE MARKET MONITORING ACTIVE
        </p>
      </div>
    </ClientOnly>
  </BaseCard>
</template>