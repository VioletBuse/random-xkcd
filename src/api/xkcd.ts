import * as cheerio from "cheerio"

type XKCDApiResult = {
    num: number;
    title: string;
    safe_title: string;
    alt: string;
    transcript: string;
    img: string;
}

const UserAgent = "Explain XKCD Site to Read on Mobile julian@julianbuse.com"

const getXKCDData = async (comic?: number): Promise<XKCDApiResult> => {
    const url = comic ? `https://xkcd.com/${comic}/info.0.json` : "https://xkcd.com/info.0.json"


    const data = await fetch(url, {
        headers: {
            "User-Agent": UserAgent
        }
    })

    if (data.status !== 200) {
        throw new Error("Error fetching data from xkcd api")
    }

    const jsonData: XKCDApiResult = await data.json()

    return jsonData;
}

const getMostRecentComicNumber = async (): Promise<number> => {
    const data = await getXKCDData()

    return data.num;
}


const getTitleOfComic = async (comic: number): Promise<string> => {
    const data = await getXKCDData(comic)

    return data.safe_title
}

const getExplainXkcdComicUrl = async (comic: number): Promise<string> => {
    const safeTitle = await getTitleOfComic(comic)

    const titleThing = `${comic}: ${encodeURIComponent(safeTitle)}`.replaceAll("%20", "_")

    const spacesRemoved = titleThing.replaceAll(" ", "_")

    return `https://www.explainxkcd.com/wiki/index.php/${spacesRemoved}`
}

const getMostRecentlyScrapedComic = async (): Promise<number | null> => {
    const result = await DATA.get("MOST_RECENTLY_SCRAPED");

    if (!result) {
        return null
    }

    const item = parseInt(result)

    if (item !== item) {
        return null
    }

    return item
}

const setMostRecentlyScrapedComic = async (item: number) => {
    await DATA.put("MOST_RECENTLY_SCRAPED", item.toString())
}

const getComicToScrape = async (): Promise<number> => {
    const lastScrapedComic = await getMostRecentlyScrapedComic()
    const lastPublishedComic = await getMostRecentComicNumber()

    if (lastScrapedComic === null) {
        return 0
    }

    if (lastScrapedComic >= lastPublishedComic) {
        return 0
    }

    return lastScrapedComic + 1;
}

const getRawResponseTextFor = async (url: string): Promise<string | null> => {
    const data = await fetch(url, {
        headers: {
            "User-Agent": UserAgent
        }
    });

    if(data.status !== 200 && data.status !== 404) {
        throw new Error("Error fetching text: " + url)
    }

    if (data.status === 404) {
        return null
    }

    const html = await data.text();

    return html;
}

const parseHtmlOfExplainer = async (html: string): Promise<string> => {
    const $ = cheerio.load(html)

    const content = $("span#Explanation").parent().nextUntil("h2")

    $("*", content).each(function(i, elem) {
        const tag = $(this)
        tag.removeAttr("id class")

        const srcAttr = tag.attr("src")
        if (srcAttr && srcAttr[0] === "/") {
            tag.attr("src", `https://www.explainxkcd.com${srcAttr}`)
        } 
    })



    return $.html(content)
}

const createComicPage = async (comic: number): Promise<string | null> => {

    const data = await getXKCDData(comic);

    const explainerUrl = await getExplainXkcdComicUrl(comic)
    const explainerHtml = await getRawResponseTextFor(explainerUrl)

    if (!explainerHtml) {
        return null
    }

    const explainerContent = await parseHtmlOfExplainer(explainerHtml);

    const normalize = await getRawResponseTextFor("https://unpkg.com/normalize.css@8.0.1/normalize.css")

    const $ = cheerio.load(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${data.num}: ${data.title}</title>
            <meta charset="UTF-8" />
            <style>
                ${normalize}
            </style>
            <style>
                html, body {
                    background-color: #212121;
                    color: #cdcdcd;
                }

                a:link {
                    color: #cdcdcd;
                }

                a:visited {
                    color: #cdcdcd;
                }

                .root {

                }

                .header {
                    padding: 0rem 3rem 0rem 3rem;
                }

                .main {
                    width: 100vw;
                    display: flex;
                    align-items: center;
                    justify-content: center; 
                    flex-direction: column;
                }

                .main > h4, .main > p {
                    padding: 0.5rem 3rem 0rem 3rem;
                }

                .main > img {

                }

                .explanation {
                    padding: 0rem 3rem 0rem 3rem;
                }
            </style>
        </head>
        <body>
            <div class="root">
                <div class="header">
                    <h1>Random XKCD by Julian Buse</h1>
                </div>
                <div class="main">
                    <h4>${data.num}: ${data.title}</h4>
                    <img src=${data.img} />
                    <p>${data.alt}</p>
                </div>
                <br />
                <br />
                <div class="explanation">
                    <h1>Explanation</h1>
                    ${explainerContent}
                </div>
                <br />
                <br />
            </div>
        </body>
        </html>
    `)

    return $.html()
}

const setComicValue = async (comic: number, html: string) => {
    await DATA.put(`COMIC:${comic}`, html)
}

export const scrape = async (toScrape?: number) => {
    const comic = toScrape || await getComicToScrape();
    const page = await createComicPage(comic)

    if (!page) {
        return setMostRecentlyScrapedComic(comic)
    }

    await setComicValue(comic, page)
    await setMostRecentlyScrapedComic(comic)
}

const getAllScrapedComics = async (cursor?: string): Promise<string[]> => {
    const list = await DATA.list({
        prefix: "COMIC:",
        cursor: cursor
    });

    const keys = list.keys.map(key => key.name);
    if (list.list_complete) {
        return keys
    } else {
        const remainder = await getAllScrapedComics(list.cursor)

        return [...keys, ...remainder]
    }
}

export const getRandomComicPage = async (): Promise<string | null> => {
    const comics = await getAllScrapedComics()

    if (comics.length === 0) {
        return null
    }

    const comic = comics[Math.floor(Math.random() * comics.length)]

    const html = await DATA.get(comic);

    return html;
}
