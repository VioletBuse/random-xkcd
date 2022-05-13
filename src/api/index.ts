import { getComicToScrape, getExplainXkcdComicUrl, getRawResponseTextFor, parseHtmlOfExplainer, scrape } from "./xkcd"

const handle = async (event: ScheduledEvent) => {

    await scrape(2288)
    return
}

const ScheduledEventHandler = handle

export default ScheduledEventHandler
