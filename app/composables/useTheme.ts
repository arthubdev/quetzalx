export function useTheme() {
  const theme =
    useState<
      'dark' | 'light'
    >(
      'theme',
      () => 'dark',
    )

  function toggleTheme() {
    theme.value =
      theme.value === 'dark'
        ? 'light'
        : 'dark'

    document.documentElement
      .classList.remove(
        'dark',
        'light',
      )

    document.documentElement
      .classList.add(
        theme.value,
      )
  }

  return {
    theme,

    toggleTheme,
  }
}