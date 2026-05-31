import {
  getDashboard,
} from '../../services/dashboard'

export default defineEventHandler(
  async () => {
    const dashboard =
      await getDashboard()

    return {
      success: true,

      ...dashboard,
    }
  },
)