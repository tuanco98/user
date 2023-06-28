import { Decimal128, IndexDescription, ObjectId } from "mongodb"
import { Box } from "./Box"
import { NftType, StatusMyList } from "./Common"
import { ParaArt } from "./ParaArt"
import { Paragon } from "./Paragon"
import { RunePack } from "./RunePack"

export interface Order {
    _id: ObjectId
    owner: string
    orderId: string
    blockNumber: number
    nftType: NftType
    currency: string
    status: StatusMyList
    nftId: string
    nftData: RunePack | Paragon | ParaArt | Box | null
    order_txid: string
    bidder?: string
    last_bid_txid?: string
    last_bid_log_index?: number
    initPrice: Decimal128
    spotPrice: Decimal128
    canceledAt?: number
    confirmedAt?: number
    lastUpdatedAt?: number
    winner?: string
    isExpired?: boolean
    lastPrice: Decimal128
    fee?: Decimal128
    createdAt: number
    endAt: number
}

export const OrderIndexes: IndexDescription[] = [
    { key: { orderId: 1 }, unique: true },
    { key: { owner: 1 }, background: true },
    { key: { nftType: 1 }, background: true },
    { key: { nftId: 1 }, background: true },
    { key: { currentPrice: 1 }, background: true },
    { key: { initPrice: 1 }, background: true },
    { key: { spotPrice: 1 }, background: true },
    { key: { lastPrice: 1 }, background: true },
    { key: { createdAt: 1 }, background: true },
    { key: { lastUpdatedAt: 1 }, background: true },
    { key: { status: 1 }, background: true },
    { key: { owner: 1, NftType: 1,'nftData.rawData.rentInfo.enable': 1 }, background: true },
    { key: { owner: 1, NftType: 1 }, background: true },
    { key: { owner: 1, status: 1 }, background: true },
    { key: { last_bid_txid: 1, last_bid_log_index: 1 }, background: true },
]
