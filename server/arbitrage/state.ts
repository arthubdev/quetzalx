import {
  marketCache,
} from '../services/market-cache'

import {
  runAutoTrader,
} from '../services/auto-trader'

import {
  emitEvent,
} from '../services/event-bus'

import type {
  MarketQuote,
} from './types'

export function setMarketQuote(
  quote: MarketQuote,
) {
  marketCache.quotes.set(
    quote.exchangeCode,
    quote,
  )

  emitEvent(
    'market:update',
    quote,
  )

  runAutoTrader()
}

export function getMarketQuotes() {
  return Array.from(
    marketCache.quotes.values(),
  )
}

export function clearMarketState() {
  marketCache.quotes.clear()
}