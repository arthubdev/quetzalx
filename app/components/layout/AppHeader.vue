<script setup lang="ts">
import {
  Menu,
} from 'lucide-vue-next'

const {
  isOpen,
} = useSidebar()
</script>

<template>
  <header
    class="
      sticky
      top-0
      z-50

      border-b
      border-slate-800

      bg-[#070B14]/90
      backdrop-blur
    "
  >
    <div
      class="
        flex
        h-16
        items-center
        justify-between

        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div
        class="
          flex
          items-center
          gap-4
        "
      >
        <button
          class="
            rounded-lg
            p-2

            transition

            hover:bg-slate-800

            lg:hidden
          "
          @click="
            isOpen = true
          "
        >
          <Menu
            class="
              h-6
              w-6
            "
          />
        </button>

        <h2
          class="
            text-lg
            font-semibold
          "
        >
          Dashboard
        </h2>
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
            h-2
            w-2
            rounded-full

            bg-green-500
          "
        />

        <span
          class="
            text-sm
            text-slate-400
          "
        >
          Live
        </span>
      </div>
    </div>
  </header>
</template>