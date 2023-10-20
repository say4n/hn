import { appCacheName } from "./const";

const setItemWithExpiry = async (key: string, value: string, ttl: number = 60) => {
  const cache = await caches.open(appCacheName)
  await cache.put(
    key,
    new Response(JSON.stringify(
      {
        expiry: new Date().getTime() + ttl * 1_000,
        payload: value,
      }
    ))
  )
}

const getItemWithExpiry = async (key: string) => {
  const cache = await caches.open(appCacheName)

  if (!(await cache.match(key))?.ok)
    return

  const { expiry, payload } = await (await cache.match(key))?.json()

  if (new Date().getTime() > expiry) {
    cache.delete(key)
    return
  }

  return payload
}

export const fetcher = async (url: URL | string) => {
  const cacheKey = new URL(url).pathname;
  const item = await getItemWithExpiry(cacheKey)

  if (item)
    return JSON.parse(item)

  const response =  await fetch(url)
  const json = await response.json()
  
  await setItemWithExpiry(cacheKey, JSON.stringify(json))
  const itemAfterSet = await getItemWithExpiry(cacheKey)

  return JSON.parse(itemAfterSet)
}
