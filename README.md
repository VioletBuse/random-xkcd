# Random XKCD

## About

[Random XKCD](https://xkcd.julianbuse.com) is a site that allows me to read xkcd comics, and [explanations](https://www.explainxkcd.com) of them, on my phone. I used to read them on [explain xkcd](https://www.explainxkcd.com), but the site isn't optimized for mobile, and I wanted to be able to read them on-the-go. To do this I created a site with cloudflare workers to grab that data, and store it.

## How it works

There are two parts to this project: a __scraper__ and a __renderer__. 

### The Scraper:

The scraper has an index of all comics, and scrapes at a rate of one comic per minute. This means that at the current count, the index gets fully refreshed every two days. It first makes a request to https://xkcd.com/info.0.json, which returns data on the most recent comic. This allows me to cache the image, by downloading it, and then storing the image in KV, which allows me to serve it quite quickly. It then compares the number of the most recent comic with the number of the most recently scraped comic, and if they are the same, loops back around. 

The scraper then takes the number of the comic to be scraped, and queries the site explainxkcd.com for it. It grabs the html of the explanation and transcript, removes some stuff (such as notices that are relevant to the wiki), and makes things like tables behave better. This html is saved alongside some other data about the comic in cloudflare workers KV.

### The Renderer:

The renderer queries KV for a list of all the comics that have already been scraped. It picks one at random, and renders it using a template. This gets returned to the user. This bit is quite simple, and just makes the data look pretty. Everything is cached in KV, so none of the requests hit the origin, which should in theory allow me to improve the loading times of assets.

## TODO

The webpage feels slow to use. I have some caching, so when reloading it's done in about 200 to 300 milliseconds, but without I have seen highs of 900ms when looking for a random comic.
