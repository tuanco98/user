import { IndexDescription } from "mongodb";

export interface LogBoxDetail {
    tokenId?: number;
    ownerAddress: string
    quantity?: number
    currency?: string
    nftType: string
    typeBox?: number
    blockNumber: number
    status: string
    txid: string
    createdAt: number
    runeAmount?: number[]
    totalRune?: number
}
export const LogBoxDetailIndexes: IndexDescription[] = [
    { key: { tokenId: 1 } },
    { key: { ownerAddress: 1 } },
    { key: { nftType: 1 } },
    { key: { blockNumber: 1 } },
    { key: { status: 1 } },
    { key: { txId: 1 }},
    { key: { createdAt: 1 } },
    { key: { price: 1 } },
    { key: { nftName: 1 } },
]