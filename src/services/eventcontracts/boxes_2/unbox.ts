import { EventData } from "web3-eth-contract"

import { Boxes, LogBoxDetails, mongo } from "../../../mongodb"
import { BoxStatus } from "../../../models/Box"
import { LogBoxStatus, NftType } from "../../../models/Common"
import { getTimestampFromBlock, mili_timestamp } from "../../../utils"
import { web3 } from "../../../web3"

export const unbox = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { blockNumber, transactionHash, returnValues } = event
        const { boxType, boxId } = returnValues
        await session.withTransaction(async () => {
            const getBox = await Boxes.findOne({ tokenId: Number(boxId), typeBox: Number(boxType) }, { session })
            if (!getBox) throw new Error(`box not found`)
            if (getBox.unbox) return
            const timestamp = await getTimestampFromBlock(blockNumber)
            await Boxes.updateOne(
                { tokenId: Number(boxId), typeBox: Number(boxType) },
                {
                    $set: {
                        unbox: true,
                        unbox_txid: transactionHash,
                        unbox_blockNumber: blockNumber,
                        status: BoxStatus.opened,
                    },
                },
                { session }
            )
            await LogBoxDetails.insertOne(
                {
                    ownerAddress: getBox.ownerAddress,
                    tokenId: getBox.tokenId,
                    quantity: 1,
                    nftType: NftType.BOX,
                    typeBox: getBox.typeBox,
                    blockNumber: blockNumber,
                    status: LogBoxStatus.OPENED,
                    txid: transactionHash,
                    createdAt: mili_timestamp(timestamp),
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
