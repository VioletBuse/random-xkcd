import React from 'react'
import { ReactElement } from 'react'
import { MainComicPage } from './pages/comic'
import * as ReactDOMServer from 'react-dom/server'
import * as ReactDOMClient from 'react-dom/client'
import { NotFoundPage } from './pages/notFound'
import { ServerErrorPage } from './pages/serverError'
import { ComicData } from '../api/xkcd'

const routeRegistry: { [key: string]: [string, React.FC<any>] } = {
  '^/[1-9][0-9]*/?$': ["comic", MainComicPage],
  '^/error404/?$': ["404", NotFoundPage],
  '^/error500/?$': ["500", ServerErrorPage],
}

const pathnameToComponent = (pathname: string): [string, React.FC] | null => {
  let finalElement: null | [string, React.FC] = null

  Object.entries(routeRegistry).forEach(([key, value]) => {
    const rex = new RegExp(key)
    const matches = rex.test(pathname)

    if (matches) {
      finalElement = value
    }
  })

  return finalElement
}

const generateHeaders = ([cType, Component]: [string, React.FC], props: Record<string, unknown>): string => {
  switch (cType) {
    case "404": {
      return ReactDOMServer.renderToString(<>
        <title>Page Not Found</title>
      </>)
      break;
    }
    case "500": {
      return ReactDOMServer.renderToString(<>
        <title>Internal Server Error</title>
      </>)
      break;
    }
    case "comic": {
      const data = props as ComicData

      return ReactDOMServer.renderToString(<>
        <title>
          {data.num}: {data.title}
        </title>
        <meta property="og:title" content={data.title} />
        <meta property='og:type' content="website" />
        <meta property='og:image' content={`https://xkcd.julianbuse.com/images/${data.num}`} />
        <meta property='og:url' content={`https://xkcd.julianbuse.com/${data.num}`} />
        <meta property='og:description' content={data.alt} />
        <meta property='og:site_name' content='Random XKCD' />
        <meta property='twitter:card' content='summary_large_image' />
      </>)
      break;
    }
    default: {
      return ""
      break;
    }
  }
}

export const renderComponent = (
  url: string,
  componentProps: Record<string, unknown>,
) => {
  const pathname = new URL(url).pathname
  const componentQueryResult = pathnameToComponent(pathname)

  if (!componentQueryResult) {
    throw new Error('This path does not correspond to a page')
  }

  const [cType, Component] = componentQueryResult;

  console.log('component found: ', Component.name)

    const app = ReactDOMServer.renderToString(<Component {...componentProps} />)

  console.log('app rendered')

  console.log('helmet static rendered')

  console.log('html and body attributed rendered')

  const markup = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
            <link rel="manifest" href="/static/site.webmanifest">
            <link rel="stylesheet" href="static/normalize.css">
            <link rel="stylesheet" href="/static/index.css">
            ${generateHeaders(componentQueryResult, componentProps)}
            <script>
                window.__appProps = ${JSON.stringify(componentProps)}
            </script>
        </head>
        <body>
            <div id="root">${app}</div>
            <script src="/static/index.js"></script>
        </body>
    </html>
    `

  console.log('rendered markup: ', markup)

  return markup
}

if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
  const pathname = location.pathname
  const componentQueryResult = pathnameToComponent(pathname)

  if (!componentQueryResult) {
    throw new Error('No Component For This Route')
  }

  const [cType, Component] = componentQueryResult

  const appProps = window.__appProps as Record<string, unknown>
  const root = document.querySelector('#root') as Element

  ReactDOMClient.hydrateRoot(root, <Component {...appProps} />)
}
