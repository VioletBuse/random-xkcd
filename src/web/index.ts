import {
  getXKCDData,
  createImageData,
  scrape,
  getComicData,
} from './../api/xkcd'
import {
  getExplainXkcdComicUrl,
  getImageData,
  getNextComic,
  getPreviousComic,
  getRandomScrapedComic,
} from '../api/xkcd'
import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { renderComponent } from './react'

const app = new Hono()

app.get('/', async (c) => {

  const comic = await getRandomScrapedComic()

  if (!comic) {
    const data = await scrape()

    if (data) {
      return c.redirect(`/${data.num}`)
    }

    return c.redirect('/error404')
  }

  return c.redirect(`/${comic}`)
})

app.get('/:comic', async (c) => {
  const comic = parseInt(c.req.param('comic'))

  if (!comic || comic !== comic) {
    return c.redirect('/error404')
  }

  let comicData = await getComicData(comic)

  if (!comicData) {

    const data = await scrape(comic)

    console.log('data: ', data)

    if (!data) {
      return c.redirect('/error404')
    }

    comicData = data
  }

  const html = renderComponent(c.req.url, comicData)

  return c.html(html)
})

app.get('/images/:imageComic', async (c) => {
  const comic = parseInt(c.req.param('imageComic'))

  if (!comic || comic !== comic) {
    return c.redirect('/error404')
  }

  const imageRes = await getImageData(comic.toString())

  if (imageRes !== null) {
    return imageRes
  }

  const xkcdData = await getXKCDData(comic)

  if (!xkcdData) {
    return c.redirect('/error404')
  }

  const id = await createImageData(xkcdData.img, comic.toString())
  const response = await fetch(xkcdData.img)

  return response
})

app.get('/:comic/next', async (c) => {
  const comic = parseInt(c.req.param('comic'))

  if (!comic || comic !== comic) {
    return c.redirect('/error404')
  }

  const page = await getNextComic(comic)

  if (!page) {
    return c.redirect(`/${comic}`)
  }

  return c.redirect(`/${page}`)
})

app.get('/:comic/prev', async (c) => {
  const comic = parseInt(c.req.param('comic'))

  if (!comic || comic !== comic) {
    return c.redirect('/error404')
  }

  const page = await getPreviousComic(comic)

  if (!page) {
    return c.redirect(`/${comic}`)
  }

  return c.redirect(`/${page}`)
})

app.use('/static/*', serveStatic({ root: './' }))

app.get('/error404', async (c) => {
  const html = renderComponent(c.req.url, {})

  return c.html(html)
})

app.get('/error500', async (c) => {
  const html = renderComponent(c.req.url, {})

  return c.html(html)
})

app.onError((err, c) => {
  console.error("Internal Server Error: ", err.message)
  return c.redirect('/error500')
})

app.notFound((c) => c.redirect('/error404'))

const HonoApp = app

export default HonoApp
