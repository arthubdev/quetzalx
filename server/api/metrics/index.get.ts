import {
  getMetrics,
} from '../../services/metrics'

export default defineEventHandler(
  async () => {
    const metrics =
      await getMetrics()

    return {
      success: true,
      metrics,
    }
  },
)