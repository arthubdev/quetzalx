import { eq, sql } from 'drizzle-orm'

import { db } from '../db'

import { exchanges } from '../db/schema/exchanges'
import { wallets } from '../db/schema/wallets'
import { opportunities } from '../db/schema/opportunities'
import { trades } from '../db/schema/trades'
import { walletTransactions } from '../db/schema/wallet-transactions'
import { systemEvents } from '../db/schema/system-events'

import type {
  ArbitrageOpportunity,
} from '../arbitrage/types'

import {
  TRADING_FEE_RATE,
  SLIPPAGE_RATE,
} from '../arbitrage/calculator'

export async function executeTrade(
  opportunity: ArbitrageOpportunity,
) {
  return db.transaction(async (tx) => {
    const [buyExchange] = await tx
      .select()
      .from(exchanges)
      .where(
        eq(
          exchanges.code,
          opportunity.buyExchange,
        ),
      )

    const [sellExchange] = await tx
      .select()
      .from(exchanges)
      .where(
        eq(
          exchanges.code,
          opportunity.sellExchange,
        ),
      )

    if (!buyExchange || !sellExchange) {
      throw new Error('Exchange not found')
    }

    const [buyWallet] = await tx
      .select()
      .from(wallets)
      .where(
        eq(
          wallets.exchangeId,
          buyExchange.id,
        ),
      )

    const [sellWallet] = await tx
      .select()
      .from(wallets)
      .where(
        eq(
          wallets.exchangeId,
          sellExchange.id,
        ),
      )

    if (!buyWallet || !sellWallet) {
      throw new Error('Wallet not found')
    }

    const volume =
      opportunity.volumeBtc

    const buyCost =
      opportunity.buyPrice *
      volume

    const sellRevenue =
      opportunity.sellPrice *
      volume

    const buyFee =
      buyCost *
      TRADING_FEE_RATE

    const sellFee =
      sellRevenue *
      TRADING_FEE_RATE

    const slippageCost =
      ((opportunity.buyPrice +
        opportunity.sellPrice) /
        2) *
      volume *
      SLIPPAGE_RATE

    const grossProfit =
      sellRevenue - buyCost

    const netProfit =
      grossProfit -
      buyFee -
      sellFee -
      slippageCost

    const [savedOpportunity] =
      await tx
        .insert(opportunities)
        .values({
          buyExchangeId:
            buyExchange.id,

          sellExchangeId:
            sellExchange.id,

          buyPrice:
            opportunity.buyPrice.toString(),

          sellPrice:
            opportunity.sellPrice.toString(),

          spread:
            opportunity.spread.toString(),

          estimatedProfit:
            opportunity.estimatedProfit.toString(),

          volumeBtc:
            volume.toString(),

          score:
            opportunity.score.toString(),

          status:
            'executed',
        })
        .returning()

    const [savedTrade] =
      await tx
        .insert(trades)
        .values({
          opportunityId:
            savedOpportunity.id,

          buyExchangeId:
            buyExchange.id,

          sellExchangeId:
            sellExchange.id,

          volumeBtc:
            volume.toString(),

          buyPrice:
            opportunity.buyPrice.toString(),

          sellPrice:
            opportunity.sellPrice.toString(),

          grossProfit:
            grossProfit.toString(),

          tradingFees:
            (
              buyFee +
              sellFee
            ).toString(),

          slippageCost:
            slippageCost.toString(),

          netProfit:
            netProfit.toString(),

          status:
            'executed',
        })
        .returning()

    // BUY SIDE:
    // Only USDT moves here to avoid accumulating artificial BTC negatives.
    await tx
      .update(wallets)
      .set({
        usdtBalance: sql`
          ${wallets.usdtBalance}
          - ${buyCost}
          - ${buyFee}
        `,
        updatedAt: new Date(),
      })
      .where(
        eq(
          wallets.id,
          buyWallet.id,
        ),
      )

    // SELL SIDE:
    // Only USDT moves here.
    await tx
      .update(wallets)
      .set({
        usdtBalance: sql`
          ${wallets.usdtBalance}
          + ${sellRevenue}
          - ${sellFee}
        `,
        updatedAt: new Date(),
      })
      .where(
        eq(
          wallets.id,
          sellWallet.id,
        ),
      )

    await tx
      .insert(walletTransactions)
      .values([
        {
          walletId:
            buyWallet.id,

          tradeId:
            savedTrade.id,

          asset: 'USDT',

          amount:
            buyCost.toString(),

          transactionType:
            'debit',
        },
        {
          walletId:
            buyWallet.id,

          tradeId:
            savedTrade.id,

          asset: 'USDT',

          amount:
            buyFee.toString(),

          transactionType:
            'debit',
        },
        {
          walletId:
            sellWallet.id,

          tradeId:
            savedTrade.id,

          asset: 'USDT',

          amount:
            sellRevenue.toString(),

          transactionType:
            'credit',
        },
        {
          walletId:
            sellWallet.id,

          tradeId:
            savedTrade.id,

          asset: 'USDT',

          amount:
            sellFee.toString(),

          transactionType:
            'debit',
        },
      ])

    await tx
      .insert(systemEvents)
      .values({
        level: 'info',
        source: 'trade-engine',
        message: 'Trade executed',
        payload: {
          tradeId:
            savedTrade.id,

          netProfit,
        },
      })

    globalThis.io?.emit(
      'trade-executed',
      {
        tradeId:
          savedTrade.id,

        netProfit,

        executedAt:
          new Date(),

        buyExchange:
          opportunity.buyExchange,

        sellExchange:
          opportunity.sellExchange,
      },
    )

    return {
      trade:
        savedTrade,

      netProfit,
    }
  })
}