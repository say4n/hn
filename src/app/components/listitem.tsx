import useSWR from "swr"
import { fetcher } from "./utils"
import { ItemType, ListItemType } from "../model"
import { Story } from "./listitem-story"

export const ListItem = (props: { postId: string, indentation?: number }) => {
    const { data, error, isLoading } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${props.postId}.json`, fetcher)

    if (error)
        return <p>
            Error: {error}
        </p>

    if (isLoading)
        return <p>
            Loading...
        </p>

    const typedData = ListItemType.check(data)

    if ([ItemType.Story, ItemType.Job].includes(typedData.type!!))
        return (
            <Story {...typedData} />
        )
}