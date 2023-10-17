import useSWR from 'swr'
import { ListItem } from "./listitem"
import { fetcher } from './utils'

export const Section = (props: { section: string, topN: number }) => {
    const { data, error, isLoading } = useSWR(`https://hacker-news.firebaseio.com/v0/${props.section}.json`, fetcher)

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

    const firstN = data.slice(0, props.topN);

    return (
        <>
            {firstN.map((item: string) => <ListItem key={item} postId={item} />)}
        </>
    )
}