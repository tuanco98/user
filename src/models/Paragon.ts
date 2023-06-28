import { Decimal128, IndexDescription, ObjectId } from "mongodb";

export interface ParaartData {
    _id?: ObjectId
    structure: string
    image?: string
    name?: string
    tokenId: string
    createdAt: number
    submittedAt: number
    ownerAddress: string
    hashValue: string
    runeCount: number
}
export interface Paragon {
    _id?: ObjectId
    tokenId: string
    originalArt: string
    owner: string
    rawHashed: string
    runesList: number[]
    totalRune: number
    fee1: string
    fee2: string
    amount1: Decimal128
    amount2: Decimal128
    txid: string
    power: number
    isActive: boolean
    activedAt?: number
    txid_active?: string 
    blockNumber: number
    uncraftedAt?: number
    isUncraft: boolean
    createdAt: number
    isBidding: boolean
    lastUpdatedAt: number
    paraart_data: ParaartData
    lastUpdateEnergyDate: number
    lastUpdateEnergy: number
}

export const ParagonIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true },
    { key: { rawHashed: 1 } },
    { key: { createdAt: 1 } },
    { key: { originalArt: 1 } },
    { key: { txid: 1 } },
    { key: { curency: 1 } },
    { key: { lastUpdatedAt: 1 } },
    { key: { amount: 1 } },
]