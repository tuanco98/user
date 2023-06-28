import { EventData } from "web3-eth-contract";
import { mongo, RunePacks } from "../../../mongodb";
import { mili_timestamp } from "../../../utils";
import { web3 } from "../../../web3";

export const unPack = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        await session.withTransaction(async () => {
            const timestamp = (await web3.eth.getBlock(event.blockNumber)).timestamp;
            await RunePacks.updateOne(
                { id: event.returnValues.packId, unpackAt: { $exists: false } },
                { $set: { unpackAt: mili_timestamp(timestamp), isBidding: false } },
                { session }
            );
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
};
