import {
  startBinanceFeed,
} from './binance'

import {
  startKrakenFeed,
} from './kraken'

import {
  startCoinbaseFeed,
} from './coinbase'

import {
  startOkxFeed,
} from './okx'

import {
  startBybitFeed,
} from './bybit'

let started = false

export function startFeeds() {
  if (started) {
    return
  }

  started = true

  startBinanceFeed()

  startKrakenFeed()

  startCoinbaseFeed()

  startOkxFeed()

  startBybitFeed()

  console.log(
    '🚀 Market feeds started',
  )
}