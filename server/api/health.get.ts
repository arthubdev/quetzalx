export default defineEventHandler(() => {
  return {
    success: true,
    service: 'QUETZALX',
    version: '0.0.1',
    status: 'online',
    timestamp: new Date().toISOString(),
  }
})