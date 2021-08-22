export type Author = {
  name: string
  email: string
  link: string
}

export type Event = {
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
