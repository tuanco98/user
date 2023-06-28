import { EventData } from "web3-eth-contract"
import { Decimal128 } from "mongodb"
import { PRL_BUILD_URL } from "../../../config"
import { ParaartData } from "../../../models/Paragon"
import { mongo, Paragons } from "../../../mongodb"
import { CalculatePower, convertRuneListByte32, getTimestampFromBlock, mili_timestamp } from "../../../utils"
import { httpRequest } from "../../../utils/httpRequest"
import { GRAPHQL_QUERY } from "../../../utils/queryString"
import { web3 } from "../../../web3"

export const craftParagon = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        const { blockNumber, transactionHash, returnValues } = event
        const { originalArt, rawHashed, runesList, fee1, fee2, amount1, amount2, tokenId, owner } = returnValues
        await session.withTransaction(async () => {
            const get_paragon = await Paragons.findOne({ tokenId }, { session })
            if (get_paragon) return
            const id = web3.utils.hexToAscii(rawHashed).slice(0, 24)
            const { runeAmount, totalRune } = convertRuneListByte32(runesList)
            const getParaart = await httpRequest(PRL_BUILD_URL, GRAPHQL_QUERY.PR_PARA_ART_GET, { _id: id })
            const { data } = getParaart.data.data.pr_para_art_get
            const timestamp = await getTimestampFromBlock(blockNumber)

            const paraart_data: ParaartData | null = {
                _id: data._id,
                structure: data.structure,
                ownerAddress: data.ownerAddress,
                hashValue: data.hashValue,
                image: data.image,
                tokenId: data.tokenId ? data.tokenId.toString(): null,
                runeCount: data.runeCount,
                submittedAt: data.submittedAt,
                name: data.name,
                createdAt: data.createdAt,
            }
            const power = CalculatePower(runeAmount)
            await Paragons.insertOne(
                {
                    tokenId,
                    owner,
                    originalArt,
                    rawHashed,
                    runesList: runeAmount,
                    totalRune,
                    isActive: false,
                    amount1: new Decimal128(amount1),
                    amount2: new Decimal128(amount2),
                    fee1,
                    fee2,
                    txid: transactionHash,
                    blockNumber,
                    createdAt: timestamp,
                    isUncraft: false,
                    isBidding: false,
                    lastUpdatedAt: timestamp,
                    paraart_data,
                    lastUpdateEnergyDate: timestamp,
                    power,
                    lastUpdateEnergy: power,
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
