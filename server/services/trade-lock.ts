let lastTradeAt = 0

const COOLDOWN_MS =
  10000

export function canTrade() {
  return (
    Date.now() -
      lastTradeAt >
    COOLDOWN_MS
  )
}

export function markTrade() {
  lastTradeAt =
    Date.now()
}