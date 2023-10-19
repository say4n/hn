import { faSquareArrowUpRight, faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { inter } from "../const";
import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser"
import { ListItemType } from "../model";
import { ListItem } from "./listitem";



export const Story = (props: ListItemType) => {
    const [shouldExpandText, setShouldExpandText] = useState(false);
    const [shouldExpandComments, setShouldExpandComments] = useState(false);

    const timestamp = new Date(props.time!! * 1000)
    const byUrl = `https://news.ycombinator.com/user?id=${props.by}`

    return <>
        <h1 className="text-base">
            {
                props.url &&
                <>
                    <a className="hover:underline" href={props.url} target="_blank">
                        {props.title}
                    </a>
                    &nbsp;
                    <a className="text-orange-400" href={`https://news.ycombinator.com/item?id=${props.id}`} target="_blank">
                        <FontAwesomeIcon icon={faSquareArrowUpRight} />
                    </a>
                </>
            }
            {
                !props.url && props.title
            }
        </h1>
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
            {
                props.text &&
                <>
                    <li>&middot;</li>
                    <li>
                        {
                            !shouldExpandText &&
                            <button className="text-orange-400" onClick={() => setShouldExpandText(true)}>
                                expand&nbsp;<FontAwesomeIcon icon={faSquareCaretDown} />
                            </button>
                        }
                        {
                            shouldExpandText &&
                            <button className="text-orange-400" onClick={() => setShouldExpandText(false)}>
                                collapse&nbsp;<FontAwesomeIcon icon={faSquareCaretUp} />
                            </button>
                        }
                    </li>
                </>
            }
        </ul>
        {
            props.text && shouldExpandText && <>
                <br />
                <div className="text-sm">
                    {parse(props.text)}
                </div>
            </>
        }
        {
            props.kids && shouldExpandComments &&
            props.kids.map((kid) => (
                <ListItem key={kid} postId={kid} />
            ))
        }
        <br />
        <hr />
    </>
}
