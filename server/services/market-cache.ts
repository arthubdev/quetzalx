import type {
  ExchangeCode,
  MarketQuote,
} from '../arbitrage/types'

interface MarketCache {
  quotes: Map<
    ExchangeCode,
    MarketQuote
  >
}

declare global {
  var marketCache:
    | MarketCache
    | undefined
}

export const marketCache =
  globalThis.marketCache ??
  {
    quotes: new Map(),
  }

if (
  !globalThis.marketCache
) {
  globalThis.marketCache =
    marketCache
}