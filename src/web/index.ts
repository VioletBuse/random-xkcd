import { Router } from "itty-router"
import { getRandomComicPage, scrape } from "../api/xkcd"

const router = Router()

router.get("/", async () => {
    const page = await getRandomComicPage();

    if (!page) {
        return new Response("NOT FOUND", {status: 404})
    }

    return new Response(page, {
        headers: {
            "Content-Type": "text/html"
        }
    })
})

/*
router.get("/scrape", async () => {
    await scrape();

    return new Response("Success")
})

router.get("/scrape/:comic", async ({params}) => {

    if (!params) {
        throw new Error()
    }

    await scrape(parseInt((params).comic as string))

    return new Response("Success")
})
*/

router.all("*", () => new Response("NOT FOUND", {status: 404}))

const handle = async (event: FetchEvent): Promise<Response> => {
    return router.handle(event.request)
}

const ApiRequestHandle = handle

export default ApiRequestHandle