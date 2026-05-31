<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
} from 'vue'

type Ripple = {
  id: number
  x: number
  y: number
}

const mouseX = ref(0)
const mouseY = ref(0)

const cursorX = ref(0)
const cursorY = ref(0)

const ripples = ref<Ripple[]>([])

let animationId = 0
let rippleId = 0

function updateMouse(event: MouseEvent) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

function createRipple(event: MouseEvent) {
  const id = rippleId++

  ripples.value.push({
    id,
    x: event.clientX,
    y: event.clientY,
  })

  window.setTimeout(() => {
    ripples.value = ripples.value.filter(
      ripple => ripple.id !== id,
    )
  }, 700)
}

function animate() {
  cursorX.value += (
    mouseX.value - cursorX.value
  ) * 0.23

  cursorY.value += (
    mouseY.value - cursorY.value
  ) * 0.23

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener(
    'mousemove',
    updateMouse,
  )

  window.addEventListener(
    'click',
    createRipple,
  )

  animate()
})

onUnmounted(() => {
  window.removeEventListener(
    'mousemove',
    updateMouse,
  )

  window.removeEventListener(
    'click',
    createRipple,
  )

  cancelAnimationFrame(animationId)
})
</script>

<template>
  <div
    class="
      pointer-events-none
      fixed
      inset-0
      z-[9999]
    "
  >
    <!-- RIPPLE CLIC -->
    <div
      v-for="ripple in ripples"
      :key="ripple.id"
      class="
        absolute
        rounded-full
        border
        border-[#00C389]/35
        bg-transparent
        animate-ripple
      "
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
      }"
    />

    <!-- CURSOR -->
    <div
      class="
        absolute
      "
      :style="{
        left: `${cursorX}px`,
        top: `${cursorY}px`,
        transform: 'translate(-50%, -50%)',
      }"
    >
      <div
        class="
          h-8
          w-8
          rounded-full
          border
          border-[#00C389]/70
          shadow-[0_0_10px_rgba(0,195,137,0.25)]
          bg-[#00C389]/5
        "
      />

      <div
        class="
          absolute
          left-1/2
          top-1/2
          h-1.5
          w-1.5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#00C389]
        "
      />
    </div>
  </div>
</template>

<style scoped>
.animate-ripple {
  width: 14px;
  height: 14px;
  transform: translate(-50%, -50%) scale(0.2);
  animation: ripple-drop 0.7s ease-out forwards;
}

@keyframes ripple-drop {
  0% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(0.2);
  }

  70% {
    opacity: 0.25;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(10);
  }
}
</style>