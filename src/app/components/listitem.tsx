import useSWR from "swr"
import { fetcher } from "./utils"
import { ListItemType } from "../model"
import { formatDistanceToNow } from "date-fns"
import parse from "html-react-parser"
import { inter } from "../const"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight, faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export const ListItem = (props: { postId: string }) => {
    const { data, error, isLoading } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${props.postId}.json`, fetcher)
    const [shouldExpand, setShouldExpand] = useState(false);

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

    const typedData = ListItemType.check(data)
    const timestamp = new Date(typedData.time * 1000)
    const byUrl = `https://news.ycombinator.com/user?id=${typedData.by}`
    const postUrl = `https://news.ycombinator.com/item?id=${typedData.id}`

    return <>
        <h1 className="text-lg">
            {
                typedData.url &&
                <>
                    <a className="hover:underline" href={typedData.url}>
                        {typedData.title}
                    </a>
                    &nbsp;
                    <FontAwesomeIcon icon={faSquareArrowUpRight} />
                </>
            }
            {
                !typedData.url && typedData.title
            }
        </h1>
        <ul className={`mt-1 flex space-x-1 text-s ${inter.variable} font-sans leading-4 text-gray-500`}>
            <li>{typedData.score} points</li>
            <li>by <a className="text-orange-400" href={byUrl}>
                {typedData.by} <FontAwesomeIcon icon={faSquareArrowUpRight} />
            </a>
            </li>
            <li>{formatDistanceToNow(timestamp)} ago</li>
            <li>&middot;</li>
            <li>
                <a className="text-orange-400" href={postUrl}>
                    {typedData.descendants} comments <FontAwesomeIcon icon={faSquareArrowUpRight} />
                </a>
            </li>
            {
                typedData.text &&
                <>
                    <li>&middot;</li>
                    <li>
                        {
                            !shouldExpand &&
                            <button className="text-orange-400" onClick={() => setShouldExpand(true)}>
                                expand <FontAwesomeIcon icon={faSquareCaretDown} />
                            </button>
                        }
                        {
                            shouldExpand &&
                            <button className="text-orange-400" onClick={() => setShouldExpand(false)}>
                                collapse <FontAwesomeIcon icon={faSquareCaretUp} />
                            </button>
                        }
                    </li>
                </>
            }
        </ul>
        {
            typedData.text && shouldExpand && <>
                <br />
                <p className="text-s">
                    {parse(typedData.text)}
                </p>
            </>
        }
        <br />
    </>
}