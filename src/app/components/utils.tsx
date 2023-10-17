import { RequestInfo } from "undici-types";

export const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json())