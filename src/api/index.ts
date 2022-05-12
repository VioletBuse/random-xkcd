import { getComicToScrape, getExplainXkcdComicUrl, getRawResponseTextFor, parseHtmlOfExplainer, scrape } from "./xkcd"

const handle = async (event: ScheduledEvent) => {

    await scrape()
    console.log("Scraped...")
    return
}

const ScheduledEventHandler = handle

export default ScheduledEventHandler
