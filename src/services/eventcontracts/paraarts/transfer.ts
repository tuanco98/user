import { EventData } from "web3-eth-contract"
import { LeaseStatus } from "../../../models/Common"
import { Leases, mongo, ParaArts } from "../../../mongodb"

export const transfer = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        const { to, tokenId } = event.returnValues
        await session.withTransaction(async () => {
            await ParaArts.updateOne({ tokenId }, { $set: { ownerAddress: to } }, { session })
            
            await Leases.updateMany(
                { paraArtId: tokenId, status: LeaseStatus.RENTING },
                { $set: { owner: to } },
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
