<script setup lang="ts">
import {
  X,
} from 'lucide-vue-next'

import {
  navigationItems,
} from '@/constants/navigation'

const {
  isOpen,
} = useSidebar()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300"
      leave-active-class="duration-300"
    >
      <div
        v-if="isOpen"
        class="
          fixed
          inset-0

          z-[999]
        "
      >
        <div
          class="
            absolute
            inset-0

            bg-black/70
            backdrop-blur-sm
          "
          @click="
            isOpen = false
          "
        />

        <aside
          class="
            absolute
            left-0
            top-0

            h-screen
            w-72

            border-r
            border-slate-800

            bg-[#070B14]
          "
        >
          <div
            class="
              flex
              items-center
              justify-between

              p-6
            "
          >
            <h2
              class="
                text-2xl
                font-bold
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
            </h2>

            <button
              @click="
                isOpen = false
              "
            >
              <X
                class="
                  h-5
                  w-5
                "
              />
            </button>
          </div>

          <nav
            class="
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

                hover:bg-slate-900
                hover:text-white
              "
              @click="
                isOpen = false
              "
            >
              <component
                :is="item.icon"
                class="
                  h-5
                  w-5
                "
              />

              {{ item.label }}
            </NuxtLink>
          </nav>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>