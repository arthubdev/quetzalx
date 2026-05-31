import gsap from 'gsap'

import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger'

gsap.registerPlugin(
  ScrollTrigger,
)

export function useParallax() {
  function initParallax() {
    gsap.to(
      '.parallax-globe',
      {
        y: -120,

        ease: 'none',

        scrollTrigger: {
          trigger: '.hero-section',

          start: 'top top',

          end: 'bottom top',

          scrub: true,
        },
      },
    )

    gsap.to(
      '.parallax-text',
      {
        y: -60,

        ease: 'none',

        scrollTrigger: {
          trigger: '.hero-section',

          start: 'top top',

          end: 'bottom top',

          scrub: true,
        },
      },
    )

    gsap.to(
      '.parallax-card',
      {
        y: -180,

        ease: 'none',

        scrollTrigger: {
          trigger: '.hero-section',

          start: 'top top',

          end: 'bottom top',

          scrub: true,
        },
      },
    )

    gsap.to(
      '.parallax-glow',
      {
        scale: 1.3,

        ease: 'none',

        scrollTrigger: {
          trigger: '.hero-section',

          start: 'top top',

          end: 'bottom top',

          scrub: true,
        },
      },
    )
  }

  return {
    initParallax,
  }
}