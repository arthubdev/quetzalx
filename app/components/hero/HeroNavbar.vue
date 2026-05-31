<template>
  <header
    class="
      fixed
      top-0
      left-0
      right-0

      z-50

      border-b
      border-white/5

      bg-[#020617]/70

      backdrop-blur-xl
    "
  >
    <div
      class="
        mx-auto

        flex
        items-center
        justify-between

        max-w-7xl

        px-6
        py-2
      "
    >
      <!-- LOGO -->

      <a
        href="#hero"
        class="
          flex
          items-center
        "
      >
        <img
          src="/logo.png"
          alt="Quetzal X"

          class="
            h-24
            w-auto

            transition-all
            duration-300

            hover:scale-105

            drop-shadow-[0_0_20px_rgba(0,195,137,0.35)]
          "
        >
      </a>

      <!-- MENU -->

      <nav
        class="
          hidden

          items-center
          gap-10

          text-sm
          font-medium

          text-slate-300

          lg:flex
        "
      >
        <a
          href="#hero"
          class="
            transition-colors
            hover:text-[#00C389]
          "
        >
          Home
        </a>

        <a
          href="#metrics"
          class="
            transition-colors
            hover:text-[#00C389]
          "
        >
          Metrics
        </a>

        <a
          href="#how"
          class="
            transition-colors
            hover:text-[#00C389]
          "
        >
          How It Works
        </a>

        <a
          href="#trades"
          class="
            transition-colors
            hover:text-[#00C389]
          "
        >
          Trades
        </a>

        <a
          href="#growth"
          class="
            transition-colors
            hover:text-[#00C389]
          "
        >
          Growth
        </a>
      </nav>
    </div>
  </header>
</template>