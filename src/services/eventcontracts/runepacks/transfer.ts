import { EventData } from "web3-eth-contract";
import { mongo, RunePacks } from "../../../mongodb"

export const transfer = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        const { to, tokenId } = event.returnValues

        await session.withTransaction(async () => {
            await RunePacks.updateOne({ id: tokenId }, { $set: { owner: to }}, { session })
        })
        return
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally { await session.endSession()}
}