import useSWR from 'swr'
import { ListItem } from "./listitem"
import { fetcher } from '@/utils'
import { useLayoutEffect, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

export const Section = (props: { section: string, topN: number | string }) => {
    const { data, error, isLoading } = useSWR(`https://hacker-news.firebaseio.com/v0/${props.section}.json`, fetcher)

    const count = typeof props.topN === 'number' ? props.topN : data?.length ?? 0

    const parentRef = useRef<HTMLDivElement>(null)
    const parentOffsetRef = useRef(0)
    const rowVirtualizer = useWindowVirtualizer({
        count: count,
        scrollMargin: parentOffsetRef.current,
        estimateSize: () => count,
        overscan: 5,
    })

    useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
    })


    if (error) {
        return <p>
            Error: {error}
        </p>
    }

    if (isLoading) {
        return <p> Loading...</p>
    }


    const firstN = data.slice(0, count);
    const vItems = rowVirtualizer.getVirtualItems()

    return (
        <div id="parent" ref={parentRef}>
            <div id="list-container"
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                }}
            >
                <div id="list-container-inner"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${vItems[0] ? vItems[0].start - rowVirtualizer.options.scrollMargin : 0
                            }px)`,
                    }}
                >
                    {vItems.map((virtualRow) => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={rowVirtualizer.measureElement}
                        >
                            <ListItem key={firstN[virtualRow.index]} postId={firstN[virtualRow.index]} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}