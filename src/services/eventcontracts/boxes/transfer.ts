import { EventData } from "web3-eth-contract"
import { Box } from "../../../models/Box"
import { LogBoxStatus, NftType, null_address } from "../../../models/Common"
import { LogBoxDetail } from "../../../models/LogBoxDetail"
import { Boxes, mongo } from "../../../mongodb"
import { getTimestampFromBlock, mili_timestamp } from "../../../utils"
import { web3 } from "../../../web3"
import { buyBoxEvent, buyBoxEventLog } from "./buyBox"

export const transfer = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        const { blockNumber, transactionHash, returnValues } = event
        const { from, to, tokenId } = returnValues
        await session.withTransaction(async () => {
            if (from === null_address && to !== null_address) {
                const getBox = await Boxes.findOne({ tokenId: Number(tokenId) }, { session })
                if (getBox) return
                const timeStamp = await getTimestampFromBlock(blockNumber)
                const newBox: Box = {
                    tokenId: Number(tokenId),
                    ownerAddress: to,
                    quantity: 1,
                    buyBox_txid: transactionHash,
                    buyBox_blockNumber: blockNumber,
                    nftType: NftType.BOX,
                    isBidding: false,
                    createdAt: timeStamp,
                    lastUpdatedAt: timeStamp,
                    unbox: false,
                }
                const newLogBox: LogBoxDetail = {
                    ownerAddress: to,
                    tokenId: Number(tokenId),
                    quantity: 1,
                    nftType: NftType.BOX,
                    blockNumber: blockNumber,
                    status: LogBoxStatus.BUY,
                    txid: transactionHash,
                    createdAt: timeStamp,
                }
                if (!buyBoxEvent[`${transactionHash}_${to}`]){
                    buyBoxEvent[`${transactionHash}_${to}`] = []
                    buyBoxEventLog[`${transactionHash}_${to}`] = []
                } 
                buyBoxEvent[`${transactionHash}_${to}`].push(newBox)
                buyBoxEventLog[`${transactionHash}_${to}`].push(newLogBox)

            } else {
                await Boxes.updateOne({ tokenId: Number(tokenId) }, { $set: { ownerAddress: to } }, { session })
            }
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}