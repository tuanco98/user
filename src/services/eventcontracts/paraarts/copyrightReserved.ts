import { EventData } from "web3-eth-contract"
import { PRL_BUILD_URL } from "../../../config"
import { RawData } from "../../../models/ParaArt"
import { mongo, ParaArts } from "../../../mongodb"
import { getTimestampFromBlock, mili_timestamp } from "../../../utils"
import { httpRequest } from "../../../utils/httpRequest"
import { GRAPHQL_QUERY } from "../../../utils/queryString"

export const copyrightReserved = async (event: EventData) => {
    const session = mongo.startSession()
    try {
        console.log(event)
        await session.withTransaction(async () => {
            const { transactionHash, blockNumber, returnValues} =event
            const { tokenId, owner, hashed } = returnValues

            const foundParaArt = await ParaArts.findOne({ tokenId }, { session })
            if (foundParaArt) {
                return
            }
            const timestamp = await getTimestampFromBlock(blockNumber)
            const getParaart = await httpRequest(PRL_BUILD_URL, GRAPHQL_QUERY.PR_PARA_ART_GET, { txId: event.transactionHash })
            const { data } = getParaart.data.data.pr_para_art_get
            const rawData: RawData | null = {
                _id: data?._id,
                ownerName: data?.ownerName,
                structure: data?.structure,
                image: data?.image,
                runeCount: data?.runeCount,
                submittedAt: data?.submittedAt,
                rentCount: data?.rentCount | 0,
                rented: false,
                paid: data?.paid,
                template: data?.template,
                reason: data?.reason,
                name: data?.name,
                refusedAt: data?.refusedAt,
                registeredAt: timestamp,
            }
            await ParaArts.insertOne(
                {
                    tokenId: tokenId,
                    ownerAddress: owner,
                    txId: transactionHash,
                    hashed,
                    isBidding: false,
                    createdAt: timestamp,
                    lastUpdatedAt: timestamp,
                    blockNumber: blockNumber,
                    rawData: rawData,
                },
                { session }
            )
            return
        })
    } catch (e: any) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}