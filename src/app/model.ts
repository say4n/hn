import { String, Number, Boolean, Record, Array, Static, Optional, Literal, Union } from "runtypes";

export const enum ItemType {
    Story = "story",
    Comment = "comment",
    Job = "job",
    Poll = "poll",
    PollOption = "pollopt"
}

export const ListItemType = Record({
    id: Number,

    by: Optional(String),
    dead: Optional(Boolean),
    deleted: Optional(Boolean),
    descendants: Optional(Number),
    kids: Optional(Array(Number)),
    parent: Optional(Number),
    parts: Optional(Array(Number)),
    poll: Optional(Number),
    score: Optional(Number),
    text: Optional(String),
    time: Optional(Number),
    title: Optional(String),
    type: Optional(Union(
        Literal(ItemType.Story),
        Literal(ItemType.Comment),
        Literal(ItemType.Job),
        Literal(ItemType.Poll),
        Literal(ItemType.PollOption),
    )),
    url: Optional(String),
})

export type ListItemType = Static<typeof ListItemType>;