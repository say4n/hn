import { faSquareArrowUpRight, faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { inter } from "../const";
import { formatDistanceToNow } from "date-fns";
import parse from "html-react-parser"


export const Story = (props: any) => {
    const [shouldExpandText, setShouldExpandText] = useState(false);

    const timestamp = new Date(props.time * 1000)
    const byUrl = `https://news.ycombinator.com/user?id=${props.by}`
    const postUrl = `https://news.ycombinator.com/item?id=${props.id}`

    return <>
        <h1 className="text-lg">
            {
                props.url &&
                <>
                    <a className="hover:underline" href={props.url} target="_blank">
                        {props.title}
                    </a>
                    &nbsp;
                    <FontAwesomeIcon icon={faSquareArrowUpRight} />
                </>
            }
            {
                !props.url && props.title
            }
        </h1>
        <ul className={`mt-1 flex space-x-1 text-s ${inter.variable} font-sans leading-4 text-gray-500`}>
            <li>{props.score} points</li>
            <li>by <a className="text-orange-400" href={byUrl} target="_blank">
                {props.by}&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight} />
            </a>
            </li>
            <li>{formatDistanceToNow(timestamp)} ago</li>
            <li>&middot;</li>
            <li>
                <a className="text-orange-400" href={postUrl} target="_blank">
                    {props.descendants} comments&nbsp;<FontAwesomeIcon icon={faSquareArrowUpRight} />
                </a>
            </li>
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
                <p className="text-s">
                    {parse(props.text)}
                </p>
            </>
        }
        <br />
        <hr />
    </>
}