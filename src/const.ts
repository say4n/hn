import { Inter } from "next/font/google"

export const appCacheName = "hn.cache"

export const fragmentMarker = "#/"

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const sections = [
    {
        sectionName: "top",
        sectionSlug: "topstories"
    },
    {
        sectionName: "new",
        sectionSlug: "newstories"
    },
    {
        sectionName: "best",
        sectionSlug: "beststories"
    },
    {
        sectionName: "ask",
        sectionSlug: "askstories"
    },
    {
        sectionName: "show",
        sectionSlug: "showstories"
    },
    {
        sectionName: "job",
        sectionSlug: "jobstories"
    },
]

export const topNOptions = [10, 20, 30, "all"]