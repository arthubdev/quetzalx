<script setup lang="ts">
import {
  navigationItems,
} from '@/constants/navigation'
</script>

<template>
  <aside
    class="
      hidden
      lg:flex

      fixed
      left-0
      top-0

      h-screen
      w-72

      flex-col

      border-r
      border-slate-800

      bg-[#070B14]
    "
  >
    <div
      class="
        p-8
      "
    >
      <h1
        class="
          text-4xl
          font-bold
          tracking-wide
        "
      >
        QUETZAL
        <span
          class="
            text-[#00C389]
          "
        >
          X
        </span>
      </h1>

      <p
        class="
          mt-2
          text-xs
          uppercase
          tracking-wider

          text-slate-500
        "
      >
        Arbitrage Intelligence
      </p>
    </div>

    <nav
      class="
        flex-1
        px-4
      "
    >
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.label"
        :to="item.to"
        class="
          mb-2

          flex
          items-center
          gap-3

          rounded-xl

          px-4
          py-3

          text-slate-400

          transition

          hover:bg-slate-900
          hover:text-white
        "
      >
        <component
          :is="item.icon"
          class="
            h-5
            w-5
          "
        />

        <span>
          {{ item.label }}
        </span>
      </NuxtLink>
    </nav>

    <div
      class="
        border-t
        border-slate-800

        p-4
      "
    >
      <div
        class="
          rounded-xl

          bg-slate-900

          p-4
        "
      >
        <p
          class="
            text-xs
            text-slate-500
          "
        >
          SYSTEM STATUS
        </p>

        <div
          class="
            mt-2

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
            "
          >
            Operational
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>