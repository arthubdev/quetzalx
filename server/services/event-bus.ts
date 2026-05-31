type EventHandler =
  (
    payload: any,
  ) => void

const listeners =
  new Map<
    string,
    EventHandler[]
  >()

export function emitEvent(
  event: string,
  payload: any,
) {
  const handlers =
    listeners.get(
      event,
    ) ?? []

  for (
    const handler
    of handlers
  ) {
    handler(
      payload,
    )
  }
}

export function onEvent(
  event: string,
  handler: EventHandler,
) {
  const handlers =
    listeners.get(
      event,
    ) ?? []

  handlers.push(
    handler,
  )

  listeners.set(
    event,
    handlers,
  )
}