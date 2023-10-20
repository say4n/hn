import { useState } from "react";
import { ListItemType } from "@/model"
import parse from "html-react-parser"
import { inter } from "@/const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight, faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { ListItem } from "./listitem";

export const Comment = (props: ListItemType) => {
    const [shouldExpandComments, setShouldExpandComments] = useState(false);

    const timestamp = new Date(props.time!! * 1000)
    const byUrl = `https://news.ycombinator.com/user?id=${props.by}`

    return (
        <>
            <div className="h-0.5" />
            <div className={`border-l-2 my-2 border-gray-500 ps-4`}>
                <div className="text-sm">
                    {props.text && parse(props.text)}
                </div>

                <ul className={`mt-1 flex space-x-1 text-sm ${inter.variable} font-sans leading-4 text-gray-500`}>
                    <li>{props.score} points</li>
                    <li>by <a className="text-orange-400" href={byUrl} target="_blank">
                        {props.by}&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight} />
                    </a>
                    </li>
                    <li>{formatDistanceToNow(timestamp)} ago</li>
                    {
                        props.kids && props.kids.length > 0 &&
                        <>
                            <li>&middot;</li>
                            <li>
                                {
                                    !shouldExpandComments &&
                                    <button className="text-orange-400" onClick={() => setShouldExpandComments(true)}>
                                        {props.kids.length} comments&nbsp;<FontAwesomeIcon icon={faSquareCaretDown} />
                                    </button>
                                }
                                {
                                    shouldExpandComments &&
                                    <button className="text-orange-400" onClick={() => setShouldExpandComments(false)}>
                                        {props.kids.length} comments&nbsp;<FontAwesomeIcon icon={faSquareCaretUp} />
                                    </button>
                                }
                            </li>
                        </>
                    }
                </ul>

                {
                    props.kids && shouldExpandComments &&
                    props.kids.map((kid) => (
                        <ListItem key={kid} postId={kid} />
                    ))
                }
            </div>
            <div className="h-0.5" />
        </>
    )
}