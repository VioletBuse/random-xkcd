import * as cheerio from 'cheerio';

type GenerateHtmlOpts = {
    opengraph?: {
        title?: string;
        type?: "website";
        image?: string;
        url?: string;
        description?: string;
        site_name?: string;
    }
}

const createMetaTag = (property: string, content: string) => `<meta property="${property}" content="${content}" />`;

export const generateHtml = async (title: string, style: string, body: string, opts?: GenerateHtmlOpts) => {

    const openGraphOpts = opts?.opengraph;

    const openGraphMetaTags: string[] = []

    if (openGraphOpts?.title) {
        openGraphMetaTags.push(createMetaTag("og:title", openGraphOpts.title))
    }

    if (openGraphOpts?.type) {
        openGraphMetaTags.push(createMetaTag("og:type", openGraphOpts.type))
    }

    if (openGraphOpts?.image) {
        openGraphMetaTags.push(createMetaTag("og:image", openGraphOpts.image))
    }

    if (openGraphOpts?.url) {
        openGraphMetaTags.push(createMetaTag("og:url", openGraphOpts.url))
    }

    if(openGraphOpts?.description) {
        openGraphMetaTags.push(createMetaTag("og:description", openGraphOpts.description))
    }

    if (openGraphOpts?.site_name) {
        openGraphMetaTags.push(createMetaTag("og:site_name", openGraphOpts.site_name))
    }

    const normalize = await (await fetch("https://unpkg.com/normalize.css@8.0.1/normalize.css")).text()

    const $ = cheerio.load(`
    <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="UTF-8" />
            ${openGraphMetaTags.join("\n")}
            <style>
                ${normalize}
            </style>
            <style>
                html, body {
                    background-color: #212121;
                    color: #cdcdcd;
                    font-family: monospace;
                }

                a:link {
                    color: #cdcdcd;
                }

                a:visited {
                    color: #cdcdcd;
                }

                h1 {
                    font-size: 50px;
                }
        
                h2 {
                    font-size: 45px;
                }
        
                h3 {
                    font-size: 40px;
                }
        
                p {
                    font-size: 35px;
                }
        
                li {
                    font-size: 35px;
                }

                th {
                    font-size: 35px;
                    padding: 10px;
                }

                td {
                    font-size: 35px;
                    padding: 10px;
                }

                table {
                    border-collapse: collapse;
                }

                table, th, td {
                    border: 1px solid;
                }

                dd {
                    font-size: 35px;
                }

                @media only screen and (min-width: 992px) {
                    h1 {
                        font-size: 30px;
                    }

                    h2 {
                        font-size: 26px;
                    }

                    h3 {
                        font-size: 23px;
                    }

                    p {
                        font-size: 18px;
                    }

                    li {
                        font-size: 18px;
                    }

                    th {
                        font-size: 18px;
                    }

                    td {
                        font-size: 18px;
                    }

                    dd {
                        font-size: 18px;
                    }
                }

                ${style}
            </style>
        </head>
        <body>
            ${body}
        </body>
        </html>
    `)

    return $.html()
}

export const htmlResponse = (html: string, status?: number) => {
    return new Response(html, {
        status: status,
        headers: {
            "Content-Type": "text/html"
        }
    })
}

export const notFoundPage = async () => {
    return generateHtml("Not Found", 
    `
        div {
            padding: 3rem;
        }
    `,
    `
    <div>
        <h1>Error 404: Page Not Found</h1>
        <p>Unfortunately, I couldn&apos;t find this page.</p>
    </div>
    `)
}

export const internalServerErrorPage = async () => {
    return generateHtml("Internal Server Error", 
    `
        div {
            padding: 3rem;
        }
    `,
    `
    <div>
        <h1>Error 500: Internal Server Error</h1>
        <p>Something weird happened on the server.</p>
    </div>
    `)
}
