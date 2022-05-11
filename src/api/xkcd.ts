import * as cheerio from "cheerio"
import { compareDocumentPosition } from "domutils";
import { generateHtml } from "./html";

const COMIC_PREFIX = "COMIC3:"

type XKCDApiResult = {
    num: number;
    title: string;
    safe_title: string;
    alt: string;
    transcript: string;
    img: string;
}

const UserAgent = "Explain XKCD Site to Read on Mobile julian@julianbuse.com"

const getXKCDData = async (comic?: number): Promise<XKCDApiResult | null> => {
    const url = comic ? `https://xkcd.com/${comic}/info.0.json` : "https://xkcd.com/info.0.json"


    const data = await fetch(url, {
        headers: {
            "User-Agent": UserAgent
        }
    })

    if (data.status !== 200 && data.status !== 404) {
        console.log("xkcd url: ", url)
        console.log("xkcd api response: ", await data.text())
        throw new Error("Error fetching data from xkcd api")
    }

    if (data.status === 404){
        return null
    }

    const jsonData: XKCDApiResult = await data.json()

    return jsonData;
}

const getMostRecentComicNumber = async (): Promise<number | null> => {
    const data = await getXKCDData()

    if (!data) {
        return null
    }

    return data.num;
}


const getTitleOfComic = async (comic: number): Promise<string | null> => {
    const data = await getXKCDData(comic)

    if (!data) {
        return null
    }

    return data.safe_title
}

export const getExplainXkcdComicUrl = async (comic: number): Promise<string | null> => {
    const safeTitle = await getTitleOfComic(comic)

    if (!safeTitle) {
        return null
    }

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

    if (lastPublishedComic === null) {
        throw new Error("Could not get most recent comic")
    }

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
        console.log("error response for url: ", url, " response: ", await data.text())
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
        tag.removeAttr("id class style")

        const srcAttr = tag.attr("src")
        let srcModified = false;

        //check if this is a link to another comic
        if (srcAttr && srcAttr.startsWith("/wiki/index.php/")) {
            const srcReplaced = srcAttr.replace("/wiki/index.php/", "");

            let num = "";

            for (let i = 0; i < srcReplaced.length; i++) {
                if (parseInt(srcReplaced[i]) === parseInt(srcReplaced[i])){
                    num += srcReplaced[i]
                    continue;
                } else {
                    break;
                }
            }

            if (num.length !== 0 && srcReplaced[num.length] === ":") {
                tag.attr("src", `/${parseInt(num)}`)
                srcModified = true
            }

        }
        
        if (!srcModified && srcAttr && srcAttr[0] === "/") {
            tag.attr("src", `https://www.explainxkcd.com${srcAttr}`)
        } 

        const hrefAttr = tag.attr("href")
        let hrefModified = false;

        //check if this is a link to another comic
        if (hrefAttr && hrefAttr.startsWith("/wiki/index.php/")) {
            const hrefReplaced = hrefAttr.replace("/wiki/index.php/", "");

            let num = "";

            for (let i = 0; i < hrefReplaced.length; i++) {
                if (parseInt(hrefReplaced[i]) === parseInt(hrefReplaced[i])){
                    num += hrefReplaced[i]
                    continue;
                } else {
                    break;
                }
            }

            if (num.length !== 0 && hrefReplaced[num.length] === ":") {
                tag.attr("href", `/${parseInt(num)}`)
                hrefModified = true
            }

        }
        
        if (!hrefModified && hrefAttr && hrefAttr[0] === "/") {
            tag.attr("href", `https://www.explainxkcd.com${hrefAttr}`)
        } 

    })



    return $.html(content)
}

type ComicData = {
    num: number;
    title: string;
    image: string;
    alt: string;
    transcription: string;
    explanation: string;
}

const createComicData = async (comic: number): Promise<ComicData | null> => {
    const data = await getXKCDData(comic);

    if (!data) {
        return null
    }

    const explainerUrl = await getExplainXkcdComicUrl(comic)
    if (!explainerUrl) return null

    const explainerHtml = await getRawResponseTextFor(explainerUrl)

    const explainerContent = explainerHtml ? await parseHtmlOfExplainer(explainerHtml) : "";

    return {
        num: data.num,
        title: data.title,
        image: data.img,
        alt: data.alt,
        transcription: data.transcript,
        explanation: explainerContent
    }
}

const saveComicData = async (comic: number, data: ComicData) => {
    await DATA.put(COMIC_PREFIX + comic.toString(), JSON.stringify(data))
}

const getComicData = async (comic: number) => {
    const data = await DATA.get(`${COMIC_PREFIX}${comic}`, "json") as ComicData | null;
    return data;
}

export const scrape = async (toScrape?: number): Promise<ComicData | null> => {
    const comic = toScrape || await getComicToScrape();

    const data = await createComicData(comic)

    await setMostRecentlyScrapedComic(comic)

    if (!data) {
        return null
    }

    await saveComicData(comic, data)

    return data
}

const getUnsortedListOfScrapedComics = async (cursor?: string): Promise<string[]> => {
    const list = await DATA.list({
        prefix: COMIC_PREFIX,
        cursor: cursor
    });

    const keys = list.keys.map(key => key.name);
    if (list.list_complete) {
        return keys
    } else {
        const remainder = await getUnsortedListOfScrapedComics(list.cursor)

        return [...keys, ...remainder]
    }
}

const getAllScrapedComics = async (cursor?: string): Promise<string[]> => {
    const list = await getUnsortedListOfScrapedComics();
    const sortedList = list.sort((a,b) => parseInt(a.replace(COMIC_PREFIX, "")) - parseInt(b.replace(COMIC_PREFIX, "")))

    return sortedList
}

export const getNextComic = async (comic: number): Promise<number | null> => {
    const list = await getAllScrapedComics();

    const idxOfComic = list.findIndex(key => key.replace(COMIC_PREFIX, "") === comic.toString());

    if (idxOfComic === -1) {
        return null
    }

    if (list.length === 1) {
        return comic
    }

    if (idxOfComic === list.length - 1) {
        return parseInt(list[0].replace(COMIC_PREFIX, ""))
    }

    return parseInt(list[idxOfComic + 1].replace(COMIC_PREFIX, ""))
}

export const getPreviousComic = async (comic: number): Promise<number | null> => {
    
    console.log("get previous comic")

    const list = await getAllScrapedComics()

    console.log("comic list: ", list)

    const idxOfComic = list.findIndex(key => key.replace(COMIC_PREFIX, "") === comic.toString())

    console.log("comic: ", comic, " , idx: ", idxOfComic)

    if (idxOfComic === -1) {
        return null
    }

    if (list.length === 1){
        return comic
    }

    if (idxOfComic === 0) {
        return parseInt(list[list.length - 1].replace(COMIC_PREFIX, ""))
    }

    return parseInt(list[idxOfComic - 1].replace(COMIC_PREFIX, ""))
}

export const getRandomScrapedComic = async (): Promise<number | null> => {
    const comics = await getAllScrapedComics();

    if (comics.length === 0) {
        return null
    }

    const random = comics[Math.floor(Math.random() * comics.length)]
    return parseInt(random.replace(COMIC_PREFIX, ""))
}

export const generateComicPage = async (comic: number): Promise<string | null> => {
    const data = await getComicData(comic);

    if (!data) {
        return null
    }

    return generateHtml(
        `${data.num}: ${data.title}`,
        `
        .main {
            padding: 3rem;
            margin-bottom: 17rem;
        }

        .main-header, .header-sub {
            margin: 0;
        }

        .comic-image {
            width: 100%;
            height: auto;
            max-width: 1000px;
        }

        .random-comic-button-container {
            position: fixed;
            bottom: 0;
            left: 0;
            background-image: linear-gradient(0deg, black, black, black, transparent);
            padding: 3rem;
            padding-top: 15rem;
            padding-bottom: 20rem;
            margin-bottom: -15.5rem;
            width: 100vw;
        }

        .random-comic-button {
            font-size: 50px;
            background-color: white;
            color: black;
            padding: 1rem;
            text-decoration: none;
        }

        .random-comic-button:link {
            color: black;
        }

        .random-comic-button:visited {
            color: black;
        }

        @media only screen and (min-width: 992px) {
            .random-comic-button {
                font-size: 25px;
            }

            .main {
                margin-bottom: 15rem;
            }

            .comic-image {
                width: auto;
            }
        }
        `,
        `
            <div class="main">
                <div class="header">
                    <h1 class="main-header">Random XKCD</h1>
                    <h3 class="header-sub">by Julian Buse</h3>
                </div>
                <br />
                <div class="comic">
                    <h3 class="comic-title">${data.num}: ${data.title}</h3>
                    <img class="comic-image" src="${data.image}" />
                    <p class="comic-alt">${data.alt}</p>
                </div>
                <br />
                <div class="explanation">
                    <h1 class="explanation-header">Explanation</h1>
                    ${data.explanation || "<p>No Explanation Available</p>"}
                </div>
                <div class="random-comic-button-container">
                    <a class="random-comic-button" href="/${data.num}/prev">Previous</a>
                    <a class="random-comic-button" href="/">Random Comic</a>
                    <a class="random-comic-button" href="/${data.num}/next">Next</a>
                </div>
            </div>
        `,
        {
            opengraph: {
                title: `${data.num}: ${data.title}`,
                image: data.image,
                url: `https://xkcd.julianbuse.com/${data.num}`,
                description: data.alt,
                site_name: "Random XKCD by Julian Buse"
            },
            twitter: {
                card_type: "summary_large_image"
            }
        }
    )
}
