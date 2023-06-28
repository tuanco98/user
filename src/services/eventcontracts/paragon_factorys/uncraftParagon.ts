import { EventData } from "web3-eth-contract"
import { UncraftParagonHistory } from "../../../models/UncraftParagonHistory"
import { mongo, Paragons, UncraftHistories } from "../../../mongodb"
import { getTimestampFromBlock } from "../../../utils"

export const uncraftParagon = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { blockNumber, transactionHash, returnValues } = event
        let { tokenId, burnRunes, burnExternal } = returnValues
        await session.withTransaction(async () => {
            const found_exist = await UncraftHistories.findOne({ tokenId })
            if (found_exist) return
            const timestamp = await getTimestampFromBlock(blockNumber)
            const { value } = await Paragons.findOneAndUpdate(
                { tokenId },
                { $set: { isUncraft: true, uncraftedAt: timestamp } },
                { session, returnDocument: "after" }
            )
            if (!value) throw new Error(`paragon not found`)
            burnExternal = burnExternal.map((el: string) => Number(el))
            burnRunes = burnRunes.map((el: string) => Number(el))

            const newData: UncraftParagonHistory = {
                owner: value.owner,
                tokenId,
                burnExternal,
                burnRunes,
                txid: transactionHash,
                blockNumber,
                createdAt: timestamp,
                paragonData: value,
            }
            await UncraftHistories.insertOne(newData, { session })
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
