import useSWR from "swr"
import { fetcher } from "./utils"
import { ListItemType } from "../model"
import { formatDistanceToNow } from "date-fns"
import parse from "html-react-parser"
import { inter } from "../const"

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

    const typedData = ListItemType.check(data)
    const timestamp = new Date(typedData.time * 1000)
    const byUrl = `https://news.ycombinator.com/user?id=${typedData.by}`
    const postUrl = `https://news.ycombinator.com/item?id=${typedData.id}`

    return <>
        <h1 className="text-lg">{typedData.title}</h1>
        <ul className={`mt-1 flex space-x-1 text-s ${inter.variable} font-sans leading-4 text-gray-500`}>
            <li>{typedData.score} points</li>
            <li>by <a className="text-orange-400 underline" href={byUrl}>{typedData.by}</a></li>
            <li>{formatDistanceToNow(timestamp)} ago</li>
            <li>&middot;</li>
            <li><a className="text-orange-400 underline" href={postUrl}>{typedData.descendants} comments</a></li>
            {
                typedData.url &&
                <>
                    <li>&middot;</li>
                    <li><a className="text-orange-400 underline" href={typedData.url}>link</a></li>
                </>
            }
        </ul>
        {
            typedData.text && <p className="text-s">
                {parse(typedData.text)}
            </p>
        }
        <br />
    </>
}