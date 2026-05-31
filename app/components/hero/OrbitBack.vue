<template>
  <div
    class="
      absolute
      inset-0

      z-10

      pointer-events-none
    "
  >
    <svg
      class="
        h-full
        w-full
      "
      viewBox="0 0 1200 900"
    >
      <ellipse
        cx="800"
        cy="420"
        rx="420"
        ry="140"

        class="orbit"
      />

      <ellipse
        cx="820"
        cy="450"
        rx="350"
        ry="110"

        class="orbit orbit-delay"
      />

      <ellipse
        cx="840"
        cy="400"
        rx="500"
        ry="170"

        class="orbit orbit-slow"
      />
    </svg>
  </div>
</template>

<style scoped>
.orbit {
  fill: none;

  stroke:
    rgba(
      0,
      195,
      137,
      0.15
    );

  stroke-width: 1.5;

  stroke-dasharray:
    12 10;

  animation:
    orbitFlow 15s linear infinite;
}

.orbit-delay {
  animation-duration: 22s;
}

.orbit-slow {
  animation-duration: 30s;
}

@keyframes orbitFlow {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -400;
  }
}
</style>