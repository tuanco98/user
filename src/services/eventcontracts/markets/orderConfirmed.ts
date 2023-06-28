import { ClientSession, Decimal128, Double } from "mongodb"
import { EventData } from "web3-eth-contract"

import { NftType, StatusMyList } from "../../../models/Common"
import { Order } from "../../../models/Order"
import { Bids, Boxes, mongo, Orders, ParaArts, Paragons, RunePacks } from "../../../mongodb"
import { mili_timestamp } from "../../../utils"

export const orderConfirmed = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        await session.withTransaction(async () => {
            const { blockNumber, transactionHash, returnValues, logIndex } = event
            const { buyer, orderId, price, timestamp, fee } = returnValues
            const [order_data, order_is_update] = await Promise.all([
                Orders.findOne({ orderId }, { session }),
                Orders.findOne({ last_bid_txid: transactionHash, last_bid_log_index: logIndex }, { session })
            ])
            if (!order_data || order_is_update) return
            
            await updateOrderConfirm(
                order_data,
                {
                    orderId,
                    transactionHash,
                    logIndex,
                    buyer,
                    fee,
                    price,
                    timestamp,
                },
                session
            )
            await updateBidSuccessed(
                order_data,
                { transactionHash, logIndex, buyer, price, timestamp, blockNumber },
                session
            )
            await updateNft(order_data, buyer, timestamp, session)
        })
    } catch (e) {
        if (session.inTransaction()) {
            await session.abortTransaction()
        }
        throw e
    } finally {
        await session.endSession()
    }
}
const updateOrderConfirm = async (
    order: Order,
    transactions: {
        orderId: string
        transactionHash: string
        logIndex: number
        buyer: string
        fee: string
        price: string
        timestamp: string
    },
    session: ClientSession
) => {
    try {
        await Orders.updateOne(
            { orderId: transactions.orderId },
            {
                $set: {
                    winner: transactions.buyer,
                    lastPrice: new Decimal128(transactions.price),
                    bidder: transactions.buyer,
                    fee: new Decimal128(transactions.fee),
                    last_bid_txid: transactions.transactionHash,
                    last_bid_log_index: transactions.logIndex,
                    confirmedAt: mili_timestamp(transactions.timestamp),
                    status: StatusMyList.SUCCESS,
                },
            },
            { session }
        )
        await Bids.updateOne(
            { txid: order.last_bid_txid, logIndex: order.last_bid_log_index },
            { $set: { status: StatusMyList.REFUND } },
            { session }
        )
    } catch (e) {
        throw e
    }
}
const updateBidSuccessed = async (
    order: Order,
    transactions: {
        transactionHash: string
        logIndex: number
        buyer: string
        price: string
        timestamp: string
        blockNumber: number
    },
    session: ClientSession
) => {
    try {
        const check_bid_exist = { $or: [
            { txid: transactions.transactionHash, logIndex: transactions.logIndex },
            { txid: transactions.transactionHash, logIndex: { $exists: false }}
        ]}
        const findBid = await Bids.findOne(check_bid_exist, { session })
        if (findBid) {
            await Bids.updateOne(
                check_bid_exist,
                {
                    $set: {
                        status: StatusMyList.SUCCESS,
                        price: new Decimal128(transactions.price),
                        createdAt: mili_timestamp(transactions.timestamp),
                    },
                },
                { session }
            )
        } else {
            await Bids.insertOne(
                {
                    bidder: transactions.buyer,
                    nftData: order.nftData,
                    logIndex: transactions.logIndex,
                    currency: order.currency,
                    txid: transactions.transactionHash,
                    blockNumber: transactions.blockNumber,
                    status: StatusMyList.SUCCESS,
                    nftType: order.nftType,
                    orderId: order.orderId,
                    price: new Decimal128(transactions.price),
                    createdAt: mili_timestamp(transactions.timestamp),
                },
                { session }
            )
        }
    } catch (e) {
        throw e
    }
}
const updateNft = async (order: Order, buyer: string, timestamp: number | string, session: ClientSession) => {
    try {
        switch (order.nftType) {
            case NftType.RUNE_PACK:
                await RunePacks.updateOne(
                    { id: order.nftId },
                    { $set: { isBidding: false, owner: buyer, lastUpdatedAt: mili_timestamp(timestamp) } },
                    { session }
                )
                break
            case NftType.PARAART:
                await ParaArts.updateOne(
                    { tokenId: order.nftId },
                    { $set: { isBidding: false, ownerAddress: buyer, lastUpdatedAt: mili_timestamp(timestamp) } },
                    { session }
                )
                break
            case NftType.PARAGON:
                await Paragons.updateOne(
                    { tokenId: order.nftId },
                    { $set: { isBidding: false, owner: buyer, lastUpdatedAt: mili_timestamp(timestamp) } },
                    { session }
                )
                break
            case NftType.BOX:
                await Boxes.updateOne(
                    { tokenId: Number(order.nftId) },
                    { $set: { isBidding: false, ownerAddress: buyer, lastUpdatedAt: mili_timestamp(timestamp) } },
                    { session }
                )
                break
            default:
                break
        }
    } catch (e) {
        throw e
    }
}
