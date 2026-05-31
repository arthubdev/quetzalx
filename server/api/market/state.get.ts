import { getMarketQuotes } from '../../arbitrage/state'
import { detectBestArbitrage } from '../../arbitrage/detector'

export default defineEventHandler(() => {
  const quotes = getMarketQuotes()
  const opportunity = detectBestArbitrage(quotes)

  return {
    success: true,
    quotes,
    opportunity,
  }
})