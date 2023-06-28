import { EventData } from "web3-eth-contract"
import { null_address } from "../../../models/Common"
import { mongo, Paragons } from "../../../mongodb"

export const transfer = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        const { to, tokenId } = event.returnValues
        await session.withTransaction(async () => {
            await Paragons.updateOne({ tokenId }, { $set: { owner: to } }, { session })
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
