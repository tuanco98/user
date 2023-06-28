import { Decimal128 } from "mongodb"
import { EventData } from "web3-eth-contract"
import { StatusMyList } from "../../../models/Common"
import { Bids, mongo, Orders } from "../../../mongodb"
import { mili_timestamp } from "../../../utils"

export const bid = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        await session.withTransaction(async () => {
            const { blockNumber, transactionHash, logIndex, returnValues } = event
            const { orderId, bidder, price, timestamp } = returnValues
            if (!orderId) throw new Error("BID: orderId missing")
            const order = await Orders.findOne({ orderId }, { session })
            if (!order) return

            const foundBid = await Bids.findOne(
                {
                    $or: [
                        { txid: transactionHash, logIndex },
                        { txid: transactionHash, logIndex: { $exists: false } },
                    ],
                },
                { session }
            )
            if (!foundBid) {
                await Bids.insertOne(
                    {
                        bidder,
                        nftData: order.nftData,
                        currency: order.currency,
                        txid: transactionHash,
                        logIndex,
                        blockNumber: blockNumber,
                        status: StatusMyList.BIDDING,
                        nftType: order.nftType,
                        orderId,
                        price: new Decimal128(price),
                        createdAt: mili_timestamp(timestamp),
                    },
                    { session }
                )
            }
            if (order.bidder && order.last_bid_txid !== transactionHash) {
                await Bids.updateOne(
                    { bidder: order.bidder, orderId, status: StatusMyList.BIDDING, price: order.lastPrice },
                    { $set: { status: StatusMyList.REFUND } },
                    { session }
                )
            }
            await Orders.updateOne(
                { orderId },
                {
                    $set: {
                        status: StatusMyList.BIDDING,
                        lastPrice: new Decimal128(price),
                        bidder,
                        last_bid_txid: transactionHash,
                        last_bid_log_index: logIndex,
                    },
                },
                { session }
            )
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
