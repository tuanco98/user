import { IndexDescription, ObjectId } from "mongodb";
import { Paragon } from "./Paragon";

export interface UncraftParagonHistory {
    _id?: ObjectId
    owner: string
    tokenId: string
    burnRunes: number[]
    burnExternal: number[]
    txid: string
    blockNumber: number
    createdAt: number
    paragonData: Paragon
}
export const UncraftPRGIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true, background: true },
    { key: { txid: 1 }, unique: true, background: true },
    { key: { owner: 1 }, background: true },
    { key: { createdAt: 1 }, background: true },
    { key: { blockNumber: 1 }, background: true },
]