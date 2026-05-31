export function useSidebar() {
  const isOpen = useState(
    'sidebar-open',
    () => false,
  )

  return {
    isOpen,
  }
}