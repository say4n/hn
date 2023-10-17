import { String, Number, Record, Array, Static, Optional } from "runtypes";

export const ListItemType = Record({
    by: String,
    descendants: Optional(Number),
    id: Number,
    kids: Optional(Array(Number)),
    score: Number,
    time: Number,
    text: Optional(String),
    title: String,
    type: String,
    url: Optional(String),
})

export type ListItemType = Static<typeof ListItemType>;