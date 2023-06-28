import { EventData } from "web3-eth-contract"
import { Box } from "../../../models/Box"
import { LogBoxStatus, NftType, null_address } from "../../../models/Common"
import { LogBoxDetail } from "../../../models/LogBoxDetail"
import { Boxes, mongo } from "../../../mongodb"
import { mili_timestamp } from "../../../utils"
import { web3 } from "../../../web3"
import { buyBox2Event, buyBox2EventLog } from "./buyBox"

export const transfer = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        const { from, to, tokenId } = event.returnValues
        await session.withTransaction(async () => {
            if (from === null_address && to !== null_address) {
                const getBox = await Boxes.findOne({ tokenId: Number(tokenId) }, { session })
                if (getBox) return
                const timeStamp = mili_timestamp((await web3.eth.getBlock(event.blockNumber)).timestamp)
                const newBox: Box = {
                    tokenId: Number(tokenId),
                    ownerAddress: to,
                    quantity: 1,
                    buyBox_txid: event.transactionHash,
                    buyBox_blockNumber: event.blockNumber,
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
                    blockNumber: event.blockNumber,
                    status: LogBoxStatus.BUY,
                    txid: event.transactionHash,
                    createdAt: timeStamp,
                }
                if (!buyBox2Event[`${event.transactionHash}_${to}`]){
                    buyBox2Event[`${event.transactionHash}_${to}`] = []
                    buyBox2EventLog[`${event.transactionHash}_${to}`] = []
                } 
                buyBox2Event[`${event.transactionHash}_${to}`].push(newBox)
                buyBox2EventLog[`${event.transactionHash}_${to}`].push(newLogBox)

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