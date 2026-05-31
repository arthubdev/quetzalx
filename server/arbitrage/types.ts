export type ExchangeCode =
  | 'binance'
  | 'kraken'
  | 'coinbase'
  | 'okx'
  | 'bybit'
  | 'bitfinex'
  | 'kucoin'
  | 'gateio'
  | 'bitstamp'
  | 'gemini'

export interface MarketQuote {
  exchangeCode: ExchangeCode

  bid: number

  ask: number

  timestamp: string
}

export interface ArbitrageOpportunity {
  buyExchange: ExchangeCode

  sellExchange: ExchangeCode

  buyPrice: number

  sellPrice: number

  spread: number

  estimatedProfit: number

  netProfit: number

  volumeBtc: number

  score: number

  profitable: boolean
}