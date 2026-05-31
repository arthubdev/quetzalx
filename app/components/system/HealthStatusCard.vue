<script setup lang="ts">
const {
  data,
} = useFetch(
  '/api/health',
  {
    server: false,
    refresh: 5000,
  },
)
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
      <div>
        <p
          class="
            text-sm
            text-slate-400
          "
        >
          API Health
        </p>

        <h3
          class="
            mt-2
            text-2xl
            font-bold
          "
        >
          {{
            data?.success
              ? 'Operational'
              : 'Offline'
          }}
        </h3>
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
            data?.success
              ? 'bg-green-500'
              : 'bg-red-500'
          "
        />

        <span
          class="
            text-sm
          "
        >
          {{
            data?.success
              ? 'Healthy'
              : 'Error'
          }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>