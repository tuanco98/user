import { Decimal128, IndexDescription, ObjectId } from "mongodb";

export interface Rent {
    _id?: ObjectId
    renter: string
    hashed: string
    blockNumber: number
    price: Decimal128
    currency: string
    txid: string
    createdAt: number
    status: string
    paraArtId: string
    para_art_name?: string
    totalRune?: number
    image?: string
}

export const RentIndexes: IndexDescription[] = [
    { key: { renter: 1 } },
    { key: { paraArtId: 1 } },
    { key: { hashed: 1 } },
    { key: { price: 1 } },
    { key: { txid: 1 }, unique: true },
    { key: { createdAt: 1 } },
    { key: { blockNumber: 1 } },
]