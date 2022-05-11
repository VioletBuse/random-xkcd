import { Router } from "itty-router"
import { generateHtml, htmlResponse, internalServerErrorPage, notFoundPage } from "../api/html"
import { generateComicPage, getRandomScrapedComic, scrape } from "../api/xkcd"

const router = Router()

router.get("/", async (req) => {
    const comic = await getRandomScrapedComic()

    const url = new URL(req.url)

    console.log("url: ", url)

    if (!comic) {
        return htmlResponse(await notFoundPage(), 404)
    }

    return Response.redirect(`${url.protocol}//${url.host}/${comic}`)
})

router.get("/:comic", async (req) => {


    const params = req.params;

    if (!params) {
        return htmlResponse(await internalServerErrorPage(), 500)
    }

    const comic = parseInt(params.comic);

    if (!comic || comic !== comic) {
        return htmlResponse(await internalServerErrorPage(), 500)
    }

    const page = await generateComicPage(comic)

    if (!page) {
        return htmlResponse(await notFoundPage(), 404)
    }

    return htmlResponse(page)
})

router.get("/scrape", async () => {
    await scrape();

    return new Response("Scraped")
})

router.get("/scrape/:comic", async ({params}) => {

    if (!params) {
        throw new Error()
    }

    await scrape(parseInt((params).comic as string))

    return new Response("Scraped")
})

router.all("*", () => new Response("NOT FOUND", {status: 404}))

const handle = async (event: FetchEvent): Promise<Response> => {
    return router.handle(event.request)
}

const ApiRequestHandle = handle

export default ApiRequestHandle