import { EventData } from "web3-eth-contract"

import { NftType, StatusMyList } from "../../../models/Common"
import { Boxes, mongo, Orders, ParaArts, Paragons, RunePacks } from "../../../mongodb"
import { mili_timestamp } from "../../../utils"

export const orderCancel = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { transactionHash, logIndex, returnValues } = event
        const { orderId, timestamp } = returnValues
        await session.withTransaction(async () => {
            const [findOrder, order_is_update] = await Promise.all([
                Orders.findOne({ orderId }, { session }),
                Orders.findOne({ last_bid_txid: transactionHash, last_bid_log_index: logIndex }, { session }),
            ])
            if (!findOrder || order_is_update) return
            await Orders.updateOne(
                { orderId: orderId },
                {
                    $set: {
                        canceledAt: mili_timestamp(timestamp),
                        status: StatusMyList.CANCELED,
                        last_bid_txid: transactionHash,
                        last_bid_log_index: logIndex,
                    },
                },
                { session }
            )
            switch (findOrder.nftType) {
                case NftType.RUNE_PACK:
                    await RunePacks.updateOne({ id: findOrder.nftId }, { $set: { isBidding: false } }, { session })
                    break
                case NftType.PARAART:
                    await ParaArts.updateOne({ tokenId: findOrder.nftId }, { $set: { isBidding: false } }, { session })
                    break
                case NftType.PARAGON:
                    await Paragons.updateOne({ tokenId: findOrder.nftId }, { $set: { isBidding: false } }, { session })
                    break
                case NftType.BOX:
                    await Boxes.updateOne(
                        { tokenId: Number(findOrder.nftId) },
                        { $set: { isBidding: false } },
                        { session }
                    )
                    break
                default:
                    break
            }
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
