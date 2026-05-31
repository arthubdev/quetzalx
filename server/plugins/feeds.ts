import {
  startFeeds,
} from '../exchanges/bootstrap'

export default defineNitroPlugin(
  () => {
    startFeeds()
  },
)