import { Feed } from 'feed'
import fs from 'fs'

type Author = {
  name: string
  email: string
  link: string
}

type Event = {
  accepted: number
  address: string
  catch: string
  description: string
  ended_at: string
  event_id: number
  event_type: string
  event_url: string
  hash_tag: string
  lat: number | null
  limit: number
  lon: number | null
  owner_display_name: string
  owner_id: number
  owner_nickname: string
  place: string
  series: {
    id: number
    title: string
    url: string
  }
  started_at: string
  title: string
  updated_at: string
  waiting: number
}

const getEvents = async () => {
  const endpoint = `https://connpass.com/api/v1/event/?nickname=${process.env.CONNPASS_USER_NICKNAME}&order=2`
  const res = await fetch(endpoint)
  const events = await res.json()

  if (!events) {
    return { notFound: true }
  }

  return events.events
}

const generateRssFeed = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'
  const date = new Date()
  const author: Author = {
    name: 'ysmtegsr',
    email: 'ysmtegsr@gmail.com',
    link: 'https://ysmtegsr.com'
  }

  const feed = new Feed({
    title: baseUrl,
    description: 'Developer',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.png`,
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

  if (events.notFound) {
    console.log('not found', events)
  }

  events?.forEach((e: Event) => {
    if (date > new Date(e.started_at)) {
      feed.addItem({
        title: e.title,
        description: e.catch,
        id: e.event_url,
        link: e.event_url,
        date: new Date(e.started_at)
      })
    }
  })

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}

export default generateRssFeed
