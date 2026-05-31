import {
  createSnapshot,
} from '../services/snapshot-engine'

export default defineNitroPlugin(
  () => {
    console.log(
      'Snapshot Engine Started',
    )

    setInterval(
      async () => {
        try {
          const snapshot =
            await createSnapshot()

          console.log(
            'Snapshot Created',
            snapshot,
          )
        }
        catch (error) {
          console.error(
            'Snapshot Error',
            error,
          )
        }
      },
      10_000,
    )
  },
)