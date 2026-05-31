/**
 Manual snapshot endpoint.
 Used for testing and debugging.
*/
import {
  createSnapshot,
} from '../../services/snapshot-engine'

export default defineEventHandler(
  async () => {
    const snapshot =
      await createSnapshot()

    return {
      success: true,
      snapshot,
    }
  },
)