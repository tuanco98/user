import { EventData } from "web3-eth-contract"
import { mongo, Paragons } from "../../../mongodb"
import { getTimestampFromBlock } from "../../../utils"

export const activeParagon = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { blockNumber, transactionHash, returnValues } = event
        const { tokenId, status } = returnValues
        const timestamp = await getTimestampFromBlock(blockNumber)
        await session.withTransaction(async () => {
            const is_exist = await Paragons.find({ tokenId: { $in: tokenId } }, { session }).toArray()
            if (is_exist.length !== tokenId.length) throw new Error(`please wait paragon consume. retry...`)

            for (let [index, _tokenId] of tokenId.entries()) {
                const _status = status[index] === "1" ? true : false
                await Paragons.findOneAndUpdate(
                    { tokenId: _tokenId, txid_active: { $exists: false } },
                    { $set: { isActive: _status, activedAt: timestamp, txid_active: transactionHash } },
                    { session }
                )
            }
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
