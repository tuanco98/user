import { Decimal128 } from "mongodb"
import { EventData } from "web3-eth-contract"
import { LeaseStatus } from "../../../models/Common"
import { Lease } from "../../../models/Lease"
import { RentInfo } from "../../../models/ParaArt"
import { Leases, mongo, ParaArts } from "../../../mongodb"
import { getTimestampFromBlock } from "../../../utils"

export const setRoyaltyFee = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { blockNumber, transactionHash, returnValues, logIndex } = event
        const { hashed, currency, enable, amount } = returnValues

        await session.withTransaction(async () => {
            const [is_insert_exist, is_update_exist] = await Promise.all([
                Leases.findOne({ txid: transactionHash, logIndex }, { session }),
                Leases.findOne({ last_update_txid: transactionHash, last_update_logIndex: logIndex }, { session }),
            ])
            if (is_insert_exist || is_update_exist) return

            const timestamp = await getTimestampFromBlock(blockNumber)
            const set_royalty_fee: RentInfo = {
                txid: transactionHash,
                price: new Decimal128(amount),
                currency,
                enable,
                setAt: timestamp,
            }
            const pra_data = await ParaArts.findOneAndUpdate(
                { hashed },
                { $set: { "rawData.rentInfo": set_royalty_fee } },
                { session, returnDocument: "after" }
            ).then((res) => res.value)

            if (!pra_data) throw new Error("Paraart not exist")

            if (enable) {
                const { value } = await Leases.findOneAndUpdate(
                    { hashed, status: LeaseStatus.RENTING, currency },
                    {
                        $set: {
                            price: new Decimal128(amount),
                            last_update: timestamp,
                            last_update_logIndex: logIndex,
                            last_update_txid: transactionHash,
                        },
                    },
                    { session, returnDocument: "after" }
                )
                if (!value) {
                    const lease: Lease = {
                        status: LeaseStatus.RENTING,
                        owner: pra_data.ownerAddress,
                        hashed,
                        blockNumber,
                        price: new Decimal128(amount),
                        currency,
                        txid: transactionHash,
                        enable,
                        logIndex,
                        createdAt: timestamp,
                        last_update: timestamp,
                        paraArtId: pra_data.tokenId,
                        para_art_name: pra_data.rawData.name,
                        totalRune: pra_data.rawData.runeCount,
                        image: pra_data.rawData.image,
                    }
                    await Leases.insertOne(lease, { session })
                }
            } else {
                await Leases.updateOne(
                    { hashed, status: LeaseStatus.RENTING, currency },
                    {
                        $set: {
                            status: LeaseStatus.CANCELED,
                            enable,
                            last_update: timestamp,
                            last_update_logIndex: logIndex,
                            last_update_txid: transactionHash,
                        },
                    },
                    { session }
                )
            }
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
