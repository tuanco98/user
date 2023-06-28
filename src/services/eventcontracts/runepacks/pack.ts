import { EventData } from "web3-eth-contract";

import { mongo, RunePacks } from "../../../mongodb";
import { convertRuneListByte32, getTimestampFromBlock, mili_timestamp } from "../../../utils";
import { web3 } from "../../../web3";

export const pack = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { blockNumber, transactionHash, returnValues } = event
        const { owner, packId, packData } = returnValues

        await session.withTransaction(async () => {
            const foundPack = await RunePacks.findOne({ id: packId }, { session });
            if (foundPack) {
                return
            }
            const timestamp = await getTimestampFromBlock(blockNumber)
            const { runeAmount, totalRune } = convertRuneListByte32(packData);
            await RunePacks.insertOne(
                {
                    owner,
                    id: packId,
                    blockNumber: blockNumber,
                    txid: transactionHash,
                    runeAmount,
                    totalRune,
                    isBidding: false,
                    createdAt: mili_timestamp(timestamp),
                    lastUpdatedAt: mili_timestamp(timestamp)
                },
                { session }
            );
            return
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
};
