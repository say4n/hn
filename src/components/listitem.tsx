import useSWR from "swr"
import { fetcher } from "@/utils"
import { ItemType, ListItemType } from "@/model"
import { Story } from "./listitem-story"
import { Comment } from "./listitem-comment"
import { Loading } from "./listitem-loading"

export const ListItem = (props: { postId: number }) => {
    const { data, error, isLoading } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${props.postId}.json`, fetcher)

    if (error)
        return <p>Error: {error}</p>

    if (isLoading)
        return <Loading />

    const typedData = ListItemType.check(data)

    if ([ItemType.Story, ItemType.Job].includes(typedData.type!!))
        return (
            <Story {...typedData} />
        )
    if (typedData.type!! == ItemType.Comment && !typedData.deleted)
        return (
            <Comment {...typedData} />
        )
}