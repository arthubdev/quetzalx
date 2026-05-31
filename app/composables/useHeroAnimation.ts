import gsap from 'gsap'

export function useHeroAnimation() {
  function animate() {
    const tl =
      gsap.timeline()

    tl.from(
      '.hero-badge',
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
      },
    )

    tl.from(
      '.hero-title',
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
      },
      '-=0.2',
    )

    tl.from(
      '.hero-description',
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
      },
      '-=0.4',
    )

    tl.from(
      '.hero-buttons',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
      },
      '-=0.3',
    )

    tl.from(
      '.hero-globe',
      {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
      },
      '-=0.8',
    )

    tl.from(
      '.exchange-card',
      {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
      },
      '-=0.8',
    )
  }

  return {
    animate,
  }
}