<script setup lang="ts">
import {
  ref,
} from 'vue'

const props = defineProps<{
  leftLabel: string
  rightLabel: string
}>()

const active =
  ref<'left' | 'right'>(
    'left',
  )
</script>

<template>
  <div
    class="
      rounded-2xl
      border
      border-slate-800

      bg-slate-900

      overflow-hidden
    "
  >
    <div
      class="
        flex

        border-b
        border-slate-800
      "
    >
      <button
        class="
          flex-1

          px-5
          py-4

          text-sm
          font-medium

          transition-all
        "
        :class="
          active === 'left'
            ? 'bg-slate-800 text-white'
            : 'text-slate-400 hover:text-white'
        "
        @click="
          active = 'left'
        "
      >
        {{ leftLabel }}
      </button>

      <button
        class="
          flex-1

          px-5
          py-4

          text-sm
          font-medium

          transition-all
        "
        :class="
          active === 'right'
            ? 'bg-slate-800 text-white'
            : 'text-slate-400 hover:text-white'
        "
        @click="
          active = 'right'
        "
      >
        {{ rightLabel }}
      </button>
    </div>

    <div
      class="
        p-6
      "
    >
      <Transition
        mode="out-in"
        enter-active-class="duration-200"
        leave-active-class="duration-150"
      >
        <div
          v-if="
            active === 'left'
          "
          key="left"
        >
          <slot
            name="left"
          />
        </div>

        <div
          v-else
          key="right"
        >
          <slot
            name="right"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>