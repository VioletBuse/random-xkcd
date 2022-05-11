import * as cheerio from 'cheerio';

export const generateHtml = async (title: string, style: string, body: string) => {

    const normalize = await (await fetch("https://unpkg.com/normalize.css@8.0.1/normalize.css")).text()

    const $ = cheerio.load(`
    <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <meta charset="UTF-8" />
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
