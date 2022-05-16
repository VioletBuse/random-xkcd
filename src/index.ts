import ScheduledEventHandler from "./api"
import HonoApp from "./web";

declare global {
  const DATA: KVNamespace;
  interface Window {
    __appProps: Record<string, undefined>
  }
}

HonoApp.fire()

addEventListener("scheduled", (event: ScheduledEvent) => {
  event.waitUntil(ScheduledEventHandler(event))
})
