import { IndexDescription, ObjectId } from "mongodb"

export interface RunePack {
    _id?: ObjectId
    id: string
    owner: string
    blockNumber: number
    txid: string
    totalRune: number
    runeAmount: number[]
    isBidding: boolean
    createdAt: number
    lastUpdatedAt: number
    unpackAt?: number
}

export const RunePackIndexes: IndexDescription[] = [
    { key: { id: 1 }, unique: true, background: true },
    { key: { txid: 1 }, unique: true, background: true },
    { key: { owner: 1 }, background: true },
    { key: { createdAt: 1 }, background: true },
    { key: { isBidding: 1 }, background: true },
    { key: { blockNumber: 1 }, background: true },
    { key: { runeAmount: 1 }, background: true },
    { key: { totalRune: 1 }, background: true },
    { key: { unpackAt: 1 }, background: true },
    { key: { lastUpdatedAt: 1 }, background: true },
]
