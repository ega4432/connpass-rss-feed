import { Feed } from 'feed'
import fs from 'fs'
import { Author, Event } from '../types'

const getEvents = async () => {
  const endpoint = `https://connpass.com/api/v1/event/?nickname=${process.env.CONNPASS_USER_NICKNAME}&order=2&count=30`
  const res = await fetch(endpoint)
  const events = await res.json()

  if (!events) { return { notFound: true } }

  return events.events
}

const generateRssFeed = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'
  const date = new Date()
  const author: Author = {
    name: 'ega4432',
    email: 'hello@egashira.dev',
    link: 'https://egashira.dev'
  }

  const feed = new Feed({
    title: baseUrl,
    description: 'Developer',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed/xml`,
      atom: `${baseUrl}/rss/atom.xml`,
      json: `${baseUrl}/rss/feed.json`
    },
    author
  })

  const events = await getEvents()

  if (!events.length) { return null }

  events?.forEach((e: Event) => {
    if (date > new Date(e.started_at)) {
      feed.addItem({
        title: e.title,
        description: e.catch,
        id: e.event_url,
        link: e.event_url,
        date: new Date(e.started_at),
        content: e.description.slice(0, 255)
      })
    }
  })

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}

export default generateRssFeed
