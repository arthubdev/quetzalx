<script setup lang="ts">
import {
  onMounted,
} from 'vue'

import {
  ref,
} from 'vue'

  const introFinished =
  ref(false)

import {
  useParallax,
} from '@/composables/useParallax'

import {
  useReveal,
} from '@/composables/useReveal'

import {
  useHeroAnimation,
} from '@/composables/useHeroAnimation'

import MetricsSection
from '@/components/landing/MetricsSection.vue'

import ProfitGrowthSection
from '@/components/landing/ProfitGrowthSection.vue'

import LiveTradesSection
from '@/components/landing/LiveTradesSection.vue'

import HowItWorksSection
from '@/components/landing/HowItWorksSection.vue'

const {
  animate,
} =
  useHeroAnimation()

const {
  initReveal,
} =
  useReveal()

const {
  initParallax,
} =
  useParallax()

import {
  nextTick,
} from 'vue'

import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger'

onMounted(() => {
  setTimeout(async () => {
    introFinished.value =
      true

    await nextTick()

    animate()

    initReveal()

    initParallax()

    ScrollTrigger.refresh()
  }, 3000)
})

import HeroGlobe
from '@/components/hero/HeroGlobe.vue'

import HeroNavbar
from '@/components/hero/HeroNavbar.vue'

import ParticleBackground
from '@/components/hero/ParticleBackground.vue'

import FinalCTASection
from '@/components/landing/FinalCTASection.vue'

import FooterSection
from '@/components/landing/FooterSection.vue'


definePageMeta({
  layout: false,
})
</script>

<template>
  <Transition
    name="intro"
  >
    <div
      v-if="!introFinished"
      class="
        fixed
        inset-0

        z-[99999]

        flex
        items-center
        justify-center

        bg-black
      "
    >
      <div
        class="
          intro-glow
        "
      />

      <img
        src="/textures/earth.png"

        class="
          intro-earth
        "
      >
    </div>
  </Transition>
  <div
    v-show="
      introFinished
    "
    class="
      min-h-screen

      bg-[#020617]

      text-white
    "
  >
    <HeroNavbar />

    <!-- HERO -->

    <section
      class="
      hero-section
        relative

        overflow-hidden

        px-6
        pt-28
        pb-24
      "
    >
    <ParticleBackground />
    


      <div
      id="hero"
        class="
        parallax-glow
          absolute

          left-1/2
          top-0

          h-[700px]
          w-[700px]

          -translate-x-1/2

          rounded-full

          bg-[#00C389]/10

          blur-3xl
        "
      />

      <div
        class="
          relative

          z-20

          mx-auto

          max-w-7xl
        "
      >
        <div
          class="
            grid
            items-center
            gap-12

            lg:grid-cols-2
          "
        >
          <!-- IZQUIERDA -->

          <div
            class="
            parallax-text
              text-left
            "
          >
            <span
              class="
                hero-badge
                rounded-full

                border
                border-[#00C389]/20

                bg-[#00C389]/10

                px-4
                py-2

                text-sm

                text-[#00C389]
              "
            >
              AI-Powered Arbitrage Platform
            </span>

            <h1
              class="
                hero-title
                mt-8

                text-5xl
                font-bold

                leading-tight

                md:text-7xl
              "
            >
              Unlock Market
              Inefficiencies.

              <span
                class="
                  block

                  text-[#00C389]
                "
              >
                Maximize Profits.
              </span>
            </h1>

            <p
              class="
                hero-description
                mt-8

                max-w-xl

                text-lg
                text-slate-400
              "
            >
              Monitor multiple exchanges,
              detect profitable arbitrage
              opportunities in real time,
              and execute trades with
              institutional-grade precision.
            </p>

            <div
              class="
                hero-buttons
                mt-10

                flex
                flex-wrap
                gap-4
              "
            >
              <NuxtLink
                to="/dashboard"
                class="
                  rounded-xl

                  bg-[#00C389]

                  px-8
                  py-4

                  font-semibold

                  text-black

                  transition-all

                  hover:scale-105
                "
              >
                Enter Platform
              </NuxtLink>
            </div>
          </div>

          <!-- DERECHA -->

          <div
            class="
            parallax-globe
              hero-globe
              relative

              flex
              items-center
              justify-center

              min-h-[700px]
            "
          >
            <HeroGlobe />
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics -->

    <MetricsSection />

    <HowItWorksSection />
    
    <LiveTradesSection />

    <ProfitGrowthSection />

    <FinalCTASection />

    <FooterSection />

    <!-- FEATURES -->

    <section
      class="
        mx-auto

        max-w-7xl

        px-6
        pb-24
      "
    >
      <div
        class="
          grid
          gap-6

          md:grid-cols-3
        "
      >
        <div
          class="
            rounded-2xl

            border
            border-slate-800

            bg-slate-900

            p-6
          "
        >
          <h3
            class="
              text-xl
              font-semibold
            "
          >
            Real-Time Monitoring
          </h3>

          <p
            class="
              mt-3

              text-slate-400
            "
          >
            Continuously tracks
            market prices across
            multiple exchanges.
          </p>
        </div>

        <div
          class="
            rounded-2xl

            border
            border-slate-800

            bg-slate-900

            p-6
          "
        >
          <h3
            class="
              text-xl
              font-semibold
            "
          >
            Arbitrage Detection
          </h3>

          <p
            class="
              mt-3

              text-slate-400
            "
          >
            Identifies profitable
            spreads automatically
            using intelligent routing.
          </p>
        </div>

        <div
          class="
            rounded-2xl

            border
            border-slate-800

            bg-slate-900

            p-6
          "
        >
          <h3
            class="
              text-xl
              font-semibold
            "
          >
            Trade Execution
          </h3>

          <p
            class="
              mt-3

              text-slate-400
            "
          >
            Executes and tracks
            arbitrage operations
            with full transparency.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro-glow {
  position: absolute;

  width: 600px;
  height: 600px;

  border-radius: 9999px;

  background:
    rgba(
      0,
      195,
      137,
      0.15
    );

  filter:
    blur(80px);

  animation:
    glowPulse 2s
    ease-in-out
    infinite;
}

.intro-earth {
  width: 800px;

  max-width: 80vw;

  animation:
    introEarth 3s
    ease forwards;
}

@keyframes introEarth {
  0% {
    opacity: 0;

    transform:
      scale(0.5)
      rotate(0deg);
  }

  40% {
    opacity: 1;

    transform:
      scale(1.3)
      rotate(20deg);
  }

  100% {
    opacity: 1;

    transform:
      scale(1)
      rotate(0deg);
  }
}

@keyframes glowPulse {
  0%,
  100% {
    transform:
      scale(1);
  }

  50% {
    transform:
      scale(1.15);
  }
}

.intro-enter-active,
.intro-leave-active {
  transition:
    opacity 1s;
}

.intro-enter-from,
.intro-leave-to {
  opacity: 0;
}
</style>