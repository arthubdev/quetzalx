<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'

const props =
  defineProps<{
    name: string
    price: string
    color: string
  }>()

const currentPrice =
  ref(
    Number(
      props.price.replace(
        /[$,]/g,
        '',
      ),
    ),
  )

const changeValue =
  ref(0)

const showChange =
  ref(false)

let interval:
  ReturnType<
    typeof setInterval
  >

function randomUpdate() {
  const change =
    Math.floor(
      Math.random() * 17,
    ) - 8

  if (change === 0) {
    return
  }

  currentPrice.value +=
    change

  changeValue.value =
    change

  showChange.value =
    true

  setTimeout(() => {
    showChange.value =
      false
  }, 2000)
}

onMounted(() => {
  const delay =
    4000 +
    Math.floor(
      Math.random() * 5000,
    )

  interval =
    setInterval(
      randomUpdate,
      delay,
    )
})

onBeforeUnmount(() => {
  clearInterval(
    interval,
  )
})

const formattedPrice =
  computed(() =>
    `$${currentPrice.value.toLocaleString()}`,
  )
</script>

<template>
  <div
    class="
    parallax-card
    exchange-card
      rounded-2xl

      border
      border-white/10

      bg-black/40

      px-5
      py-4

      backdrop-blur-xl

      animate-float
    "
  >
    <!-- HEADER -->

    <div
      class="
        flex
        items-center
        justify-between
      "
    >
      <p
        class="
          text-xs
          font-semibold
        "
        :style="{
          color,
        }"
      >
        {{ name }}
      </p>

      <Transition
        name="fade"
      >
        <span
          v-if="showChange"
          class="
            text-[10px]
            font-semibold
          "
          :class="
            changeValue > 0
              ? 'text-green-400'
              : 'text-red-400'
          "
        >
          {{
            changeValue > 0
              ? `↑ +${changeValue}`
              : `↓ ${Math.abs(
                  changeValue,
                )}`
          }}
        </span>
      </Transition>
    </div>

    <!-- PRICE -->

    <p
      class="
        mt-2

        text-lg
        font-bold
      "
    >
      {{ formattedPrice }}
    </p>

    <!-- PAIR -->

    <p
      class="
        text-xs
        text-slate-500
      "
    >
      BTC/USDT
    </p>
  </div>
</template>

<style scoped>
.animate-float {
  animation:
    floatCard 8s
    ease-in-out
    infinite;
}

@keyframes floatCard {
  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-12px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;

  transform:
    translateY(4px);
}
</style>