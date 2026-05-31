<template>
  <div
    class="
      absolute
      inset-0

      overflow-hidden

      pointer-events-none
    "
  >
    <span
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: particle.left,
        top: particle.top,
        animationDelay: particle.delay,
        animationDuration: particle.duration,
      }"
    />
  </div>
</template>

<script setup lang="ts">
const particles =
  Array.from(
    {
      length: 70,
    },
    (_, index) => ({
      id: index,

      left:
        Math.random() * 100 +
        '%',

      top:
        Math.random() * 100 +
        '%',

      delay:
        Math.random() * 10 +
        's',

      duration:
        8 +
        Math.random() * 12 +
        's',
    }),
  )
</script>

<style scoped>
.particle {
  position: absolute;

  width: 3px;
  height: 2px;

  border-radius: 999px;

  background: #00c389;

  opacity: 0.4;

  box-shadow:
    0 0 6px #00c389,
    0 0 12px #00c389;

  animation:
    floatParticle linear infinite;
}

@keyframes floatParticle {
  0% {
    transform:
      translateY(0)
      scale(1);

    opacity: 0;
  }

  20% {
    opacity: 0.4;
  }

  50% {
    transform:
      translateY(-40px)
      scale(1.5);
  }

  100% {
    transform:
      translateY(-80px)
      scale(1);

    opacity: 0;
  }
}
</style>