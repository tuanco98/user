import { Decimal128, Double } from "mongodb"
import { EventData } from "web3-eth-contract"

import { MyBidRentStatus } from "../../../models/Common"
import { Rent } from "../../../models/Rent"
import { mongo, ParaArts, Rents } from "../../../mongodb"
import { mili_timestamp } from "../../../utils"
import { web3 } from "../../../web3"

export const rent = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { renter, hashed, currency, amount } = event.returnValues
        await session.withTransaction(async () => {
            const foundRent = await Rents.findOne({ txid: event.transactionHash }, { session })
            if (foundRent) return

            const getParaArt = await ParaArts.findOne({ hashed }, { session })
            if (!getParaArt) throw new Error(`PARAART not found. retrying...`)

            const createdAt = mili_timestamp((await web3.eth.getBlock(event.blockNumber)).timestamp)
            const newRent: Rent = {
                renter,
                paraArtId: getParaArt.tokenId,
                para_art_name: getParaArt.rawData?.name,
                image: getParaArt.rawData?.image,
                totalRune: getParaArt.rawData?.runeCount,
                hashed,
                status: MyBidRentStatus.UNRENTED,
                blockNumber: event.blockNumber,
                price: new Decimal128(amount),
                currency,
                txid: event.transactionHash,
                createdAt,
            }
            await Promise.all([
                Rents.insertOne(newRent, { session }),
                ParaArts.updateOne({ tokenId: getParaArt.tokenId }, { $inc: { "rawData.rentCount": 1 }, $set: {"rawData.rented": true } }, { session }),
            ])
            return
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
