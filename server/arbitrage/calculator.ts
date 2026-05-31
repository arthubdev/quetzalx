import type {
  ArbitrageOpportunity,
  MarketQuote,
} from './types'

export const TRADING_FEE_RATE =
  0.001

export const SLIPPAGE_RATE =
  0.0005

export const DEFAULT_VOLUME_BTC =
  Number(
    process.env
      .ARBITRAGE_VOLUME_BTC
      ?? 1,
  )

function round2(
  value: number,
) {
  return (
    Math.round(
      value * 100,
    ) / 100
  )
}

export function calculateOpportunity(
  buy: MarketQuote,
  sell: MarketQuote,
): ArbitrageOpportunity {
  const buyPrice = buy.ask

  const sellPrice = sell.bid

const priceDifference =
  sellPrice - buyPrice

const spread =
  (
    priceDifference /
    buyPrice
  ) * 100

const grossProfit =
  priceDifference *
  DEFAULT_VOLUME_BTC

  const buyFee =
    buyPrice *
    DEFAULT_VOLUME_BTC *
    TRADING_FEE_RATE

  const sellFee =
    sellPrice *
    DEFAULT_VOLUME_BTC *
    TRADING_FEE_RATE

  const slippageCost =
    ((buyPrice + sellPrice) /
      2) *
    DEFAULT_VOLUME_BTC *
    SLIPPAGE_RATE

  const estimatedProfit =
    grossProfit

  const netProfit =
    estimatedProfit -
    buyFee -
    sellFee -
    slippageCost

  const score =
    Math.max(
      0,
      netProfit / 100,
    )

  const profitable =
    netProfit > 0

  return {
    buyExchange:
      buy.exchangeCode,

    sellExchange:
      sell.exchangeCode,

    buyPrice:
      round2(buyPrice),

    sellPrice:
      round2(sellPrice),

    spread:
      round2(spread),

    estimatedProfit:
      round2(
        estimatedProfit,
      ),

    netProfit:
      round2(netProfit),

    volumeBtc:
      DEFAULT_VOLUME_BTC,

    score:
      round2(score),

    profitable,
  }
}