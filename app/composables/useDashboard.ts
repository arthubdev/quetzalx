export function useDashboard() {
  return useFetch(
    '/api/dashboard',
  )
}