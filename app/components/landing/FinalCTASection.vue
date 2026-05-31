<template>
  <section
    class="
    reveal-section
      relative

      overflow-hidden

      px-6
      py-32
    "
  >
    <div
      class="
        absolute

        left-1/2
        top-1/2

        h-[500px]
        w-[500px]

        -translate-x-1/2
        -translate-y-1/2

        rounded-full

        bg-[#00C389]/10

        blur-3xl
      "
    />

    <div
      class="
        relative

        z-10

        mx-auto

        max-w-5xl

        text-center
      "
    >
      <p
        class="
          text-sm
          font-semibold

          tracking-widest

          text-[#00C389]
        "
      >
        READY TO START?
      </p>

      <h2
        class="
          mt-6

          text-5xl
          font-bold

          md:text-7xl
        "
      >
        Experience
        Real-Time
        Arbitrage.
      </h2>

      <p
        class="
          mx-auto

          mt-8

          max-w-2xl

          text-lg

          text-slate-400
        "
      >
        Access the Quetzal X
        platform and monitor
        opportunities, trades,
        profits and market activity.
      </p>

      <NuxtLink
        to="/dashboard"
        class="
          mt-10

          inline-flex

          rounded-2xl

          bg-[#00C389]

          px-10
          py-5

          text-lg
          font-semibold

          text-black

          transition-all

          hover:scale-105
        "
      >
        Enter Platform
      </NuxtLink>
    </div>
  </section>
</template>