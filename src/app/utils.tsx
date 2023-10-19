import { appCacheName } from "./const";

const setItemWithExpiry = (key: string, value:string, ttl: number = 60) => {
  localStorage.setItem(
    key,
    JSON.stringify(
      {
        expiry: new Date().getTime() + ttl * 1_000,
        payload: value,
      }
    )
  )
}

const getItemWithExpiry = (key: string) => {
  const item = localStorage.getItem(key)

  if (!item)
    return

  const { expiry, payload } = JSON.parse(item)

  if (new Date().getTime() > expiry) {
    localStorage.removeItem(key)
    return
  }

  return payload
}

export const fetcher = async (url: URL | string) => {
  let mUrl = new URL(url);
  let cacheKey = `${appCacheName}-${mUrl.pathname}`
  let item = getItemWithExpiry(cacheKey)

  if (item)
    return JSON.parse(item)

  const response =  await fetch(url)
  const json = await response.json()
  
  setItemWithExpiry(cacheKey, JSON.stringify(json))
  
  return JSON.parse(getItemWithExpiry(cacheKey)!!)
}
