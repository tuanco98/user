import { Boxes, mongo, Orders, ParaArts, Paragons, RunePacks } from "../../../mongodb"
import { getNftType } from "../../../utils/getNftType"
import { EventData } from "web3-eth-contract"
import { NftType, StatusMyList } from "../../../models/Common"
import { Decimal128 } from "mongodb"
import { mili_timestamp } from "../../../utils"
import { CONTRACT_MARKETPLACE_ADDRESS } from "../../../config"

export const orderCreate = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const nftType = getNftType(event.returnValues.contractNft)
        if (!nftType) return
        const { orderId, creator, currency, nftId, currentPrice, spotPrice, timestamp, timeEnd } = event.returnValues

        await session.withTransaction(async () => {
            const foundOrder = await Orders.findOne({ orderId: event.returnValues.orderId }, { session })
            if (foundOrder) {
                return
            }
            let nftData: any
            switch (nftType) {
                case NftType.BOX:
                    nftData = await Boxes.findOneAndUpdate(
                        { tokenId: Number(nftId) },
                        { $set: { isBidding: true, ownerAddress: CONTRACT_MARKETPLACE_ADDRESS } },
                        { session, returnDocument: "after" }
                    ).then((res) => res.value)
                    break
                case NftType.RUNE_PACK:
                    nftData = await RunePacks.findOneAndUpdate(
                        { id: nftId },
                        { $set: { isBidding: true, owner: CONTRACT_MARKETPLACE_ADDRESS } },
                        { session, returnDocument: "after" }
                    ).then((res) => res.value)
                    break
                case NftType.PARAART:
                    nftData = await ParaArts.findOneAndUpdate(
                        { tokenId: nftId },
                        { $set: { isBidding: true, ownerAddress: CONTRACT_MARKETPLACE_ADDRESS } },
                        { session, returnDocument: "after" }
                    ).then((res) => res.value)
                    break
                case NftType.PARAGON:
                    nftData = await Paragons.findOneAndUpdate(
                        { tokenId: nftId },
                        { $set: { isBidding: true, owner: CONTRACT_MARKETPLACE_ADDRESS } },
                        { session, returnDocument: "after" }
                    ).then((res) => res.value)
                    break
                default:
                    break
            }
            await Orders.insertOne(
                {
                    owner: creator,
                    nftType,
                    nftId,
                    currency,
                    status: StatusMyList.BID,
                    nftData,
                    blockNumber: event.blockNumber,
                    order_txid: event.transactionHash,
                    initPrice: new Decimal128(currentPrice),
                    lastPrice: new Decimal128(currentPrice),
                    spotPrice: new Decimal128(spotPrice),
                    orderId,
                    createdAt: mili_timestamp(timestamp),
                    endAt: mili_timestamp(timeEnd),
                },
                { session }
            )
            return
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
