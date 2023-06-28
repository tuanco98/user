import { IndexDescription, ObjectId } from "mongodb"

export enum BoxType {
    gold = `gold`,
    platinum = `platinum`,
    diamond = `diamond`,
}
export enum BoxStatus {
    processing = `processing`,
    rewarding = `rewarding`,
    opened = `opened`,
}
export interface UnboxDetail {
    totalRune: number
    runeAmount: number[]
}
export interface Box {
    _id?: ObjectId
    tokenId: number
    quantity?: number
    currency?: string
    ownerAddress: string
    buyBox_txid: string
    buyBox_blockNumber: number
    unbox_txid?: string
    unbox_blockNumber?: number
    nftType: string
    typeBox?: number
    isBidding: boolean
    createdAt: number
    lastUpdatedAt: number
    unbox: boolean
    unboxAt?: number
    status?: BoxStatus
}
export const BoxIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true, background: true},
    { key: { tokenId: 1, typeBox: 1 }, background: true},
    { key: { owner: 1 }, background: true },
    { key: { createdAt: 1 }, background: true },
    { key: { lastUpdatedAt: 1 }, background: true },
    { key: { blockNumber: 1 }, background: true },
    { key: { typeBox: 1 }, background: true },
    { key: { runeAmount: 1 }, background: true },
    { key: { unbox: 1 }, background: true },
    { key: { unboxAt: 1 }, background: true },
    { key: { nftType: 1 }, background: true },
    { key: { buyBox_txid: 1 }, background: true },
    { key: { "unboxDetails.totalRune": 1 }, background: true },
    { key: { ownerAddress: 1, unbox: 1 }, background: true },
    { key: { ownerAddress: 1, unbox: 1, typeBox: 1 }, background: true },
    
]
