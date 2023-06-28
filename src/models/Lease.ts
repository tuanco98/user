import { Decimal128, IndexDescription, ObjectId } from "mongodb";

export interface Lease {
    _id?: ObjectId
    status: 'renting' | 'canceled'
    owner: string
    hashed: string
    blockNumber: number
    price: Decimal128
    currency: string
    txid: string
    enable: boolean
    logIndex: number
    createdAt: number
    last_update: number
    last_update_txid?: string
    last_update_logIndex?: number
    paraArtId: string
    para_art_name?: string
    totalRune?: number
    image?: string
}
export const LeaseIndexes: IndexDescription[] = [
    { key: { txid: 1, logIndex: 1 }, unique: true, background: true},
    { key: { createdAt: 1 }, background: true},
    { key: { owner: 1 }, background: true},
    { key: { price: 1 }, background: true},
    { key: { status: 1 }, background: true},
    { key: { last_update_txid: 1, last_update_logIndex: 1 }, background: true},
    { key: { hashed: 1, status: 1, currency: 1 }, background: true},
    { key: { owner: 1, status: 1 }, background: true},
    { key: { paraArtId: 1, status: 1 }, background: true},
]