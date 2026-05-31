import gsap from 'gsap'

import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger'

gsap.registerPlugin(
  ScrollTrigger,
)

export function useReveal() {
  function initReveal() {
    gsap.utils
      .toArray(
        '.reveal-section',
      )
      .forEach(
        (section: any) => {
          gsap.from(
            section,
            {
              opacity: 0,

              y: 80,

              duration: 1,

              ease:
                'power3.out',

              scrollTrigger: {
                trigger:
                  section,

                start:
                  'top 80%',
              },
            },
          )
        },
      )
  }

  return {
    initReveal,
  }
}