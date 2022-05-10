import ScheduledEventHandler from "./api"
import ApiRequestHandle from "./web"

declare global {
  const DATA: KVNamespace
}

addEventListener('fetch', (event) => {
  event.respondWith(ApiRequestHandle(event))
})

addEventListener("scheduled", event => {
  event.waitUntil(ScheduledEventHandler(event))
})
