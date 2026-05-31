<script setup lang="ts">
import BaseCard
from '@/components/ui/BaseCard.vue'

const {
  data,
} = useFetch(
  '/api/opportunities',
  {
    server: false,
  },
)

const opportunities =
  computed(
    () =>
      data.value?.data ??
      [],
  )

const series =
  computed(
    () => [
      {
        name:
          'Estimated Profit',

        data:
          opportunities.value.map(
            (
              item: any,
            ) =>
              Number(
                item.estimatedProfit,
              ),
          ),
      },
    ],
  )

const options =
  computed(
    () => ({
      chart: {
        toolbar: {
          show: false,
        },

        background:
          'transparent',
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
    }),
  )
</script>

<template>
  <BaseCard>
    <h3
      class="
        mb-6

        text-lg
        font-semibold
      "
    >
      Profit History
    </h3>

    <ClientOnly>
      <ApexChart
        type="area"
        height="320"
        :options="options"
        :series="series"
      />
    </ClientOnly>
  </BaseCard>
</template>