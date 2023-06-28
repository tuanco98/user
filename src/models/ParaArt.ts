import { Decimal128, Double, IndexDescription, ObjectId } from "mongodb"

export interface RentInfo {
    txid: string
    price: Decimal128
    currency: string
    enable: boolean
    setAt: number
}
export interface RawData {
    _id: ObjectId
    ownerName?: string
    structure: string
    image?: string
    runeCount: number
    submittedAt?: number
    rentCount: number
    rentInfo?: RentInfo
    rented: boolean
    paid: boolean
    template: boolean
    reason?: string
    name?: string
    lastUpdatedAt?: number
    refusedAt?: number
    registeredAt?: number
}
export interface ParaArt {
    _id?: ObjectId
    tokenId: string
    ownerAddress: string
    createdAt: number
    lastUpdatedAt: number
    blockNumber: number
    txId: string
    hashed: string
    isBidding: boolean
    rawData: RawData
}
export const ParaartIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true, background: true},
    { key: { ownerAddress: 1 }, background: true},
    { key: { createdAt: 1 }, background: true},
    { key: { hashed: 1 }, background: true},
]
