import useSWR from "swr"
import { fetcher } from "./utils"
import { ListItemType } from "../model"

export const ListItem = (props: { postId: string }) => {
    const { data, error, isLoading } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${props.postId}.json`, fetcher)

    if (error) {
        return <p>
            Error: {error}
        </p>
    }

    if (isLoading) {
        return <p>
            Loading...
        </p>
    }

    console.log(props.postId, data, error)

    const typedData = ListItemType.check(data);

    return <>
        <p>
            {typedData.title}
        </p>
    </>
}