import React from "react";
import { ReactElement } from "react";
import { MainComicPage } from "./pages/comic";
import * as ReactDOMServer from "react-dom/server"
import * as ReactDOMClient from "react-dom/client"
import { Helmet } from "react-helmet";
import { NotFoundPage } from "./pages/notFound";
import { ServerErrorPage } from "./pages/serverError";

const routeRegistry: {[key: string]: React.FC<any>} = {
    "^/[1-9][0-9]*/?$": MainComicPage,
    "^/error404/?$": NotFoundPage,
    "^/error500/?$": ServerErrorPage
}

const pathnameToComponent = (pathname: string): React.FC | null => {
    let finalElement: null | React.FC = null

    Object.entries(routeRegistry).forEach(([key, value]) => {
        const rex = new RegExp(key);
        const matches = rex.test(pathname);

        if (matches) {
            finalElement = value
        }
    })

    return finalElement
}

export const renderComponent = (url: string, componentProps: Record<string, unknown>) => {
    const pathname = new URL(url).pathname
    const Component = pathnameToComponent(pathname)

    if (!Component) {
        throw new Error("This path does not correspond to a page")
    }

    const app = ReactDOMServer.renderToString(<Component {...componentProps} />);
    const helmet = Helmet.renderStatic()

    const htmlattrs = helmet.htmlAttributes.toString();
    const bodyattrs = helmet.bodyAttributes.toString();

    const markup = `
    <!DOCTYPE html>
    <html ${htmlattrs}>
        <head>
            <meta charset="UTF-8">
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
            <link rel="manifest" href="/static/site.webmanifest">
            <link rel="stylesheet" href="static/normalize.css">
            <link rel="stylesheet" href="/static/index.css">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <script>
                window.__appProps = ${JSON.stringify(componentProps)}
            </script>
        </head>
        <body ${bodyattrs}>
            <div id="root">${app}</div>
            <script src="/static/index.js"></script>
        </body>
    </html>
    `

    return markup
}

if (typeof navigator !== "undefined" && typeof document !== "undefined" && typeof window !== "undefined" && typeof location !== "undefined") {
    const pathname = location.pathname;
    const Component = pathnameToComponent(pathname)

    if (!Component) {
        throw new Error("No Component For This Route")
    }

    const appProps = window.__appProps;
    const root = document.querySelector("#root") as Element

    ReactDOMClient.hydrateRoot(root, <Component {...appProps} />)
}
