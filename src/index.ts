import ScheduledEventHandler from "./api"
import ApiRequestApp from "./web"

declare global {
  const DATA: KVNamespace;
  interface Window {
    __appProps: Record<string, unknown> | undefined;
  }
}



ApiRequestApp.fire();

addEventListener("scheduled", (event: ScheduledEvent) => {
  event.waitUntil(ScheduledEventHandler(event))
})
