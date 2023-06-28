import { Decimal128, IndexDescription, ObjectId } from "mongodb";
import { Box } from "./Box";
import { NftType, StatusMyList } from "./Common";
import { ParaArt } from "./ParaArt";
import { Paragon } from "./Paragon";
import { RunePack } from "./RunePack";

export interface Bid {
    _id: ObjectId
    bidder: string
    status: StatusMyList
    currency: string
    nftType: NftType
    blockNumber: number
    txid: string
    logIndex: number
    orderId: string
    nftData: RunePack | Paragon | ParaArt | Box | null
    price: Decimal128
    createdAt: number
}

export const BidIndexes: IndexDescription[] = [
    { key: { txid: 1, logIndex: 1 }, unique: true, background: true},
    { key: { txid: 1 }, background: true},
    { key: { orderId: 1 }, background: true},
    { key: { bidder: 1 }, background: true },
    { key: { status: 1 }, background: true },
    { key: { blockNumber: 1 }, background: true },
    { key: { nftType: 1 }, background: true },
    { key: { price: 1 }, background: true },
    { key: { createdAt: 1 }, background: true },
    { key: { bidder: 1, orderId: 1, status: 1, price: 1 }, background: true },
]