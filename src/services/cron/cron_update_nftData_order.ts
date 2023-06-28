import { NftType } from "../../models/Common"
import { Boxes, mongo, Orders, ParaArts, Paragons, RunePacks } from "../../mongodb"

let time_out = 100
export const cron_update_nftData_order = async () => {
    const session = mongo.startSession()
    try {
        const get_order = await Orders.findOne({ nftData: null })

        if (!get_order) {
            time_out = 1000
            return
        }
        time_out = 100
        await session.withTransaction(async () => {
            let nftData: any
            switch (get_order.nftType) {
                case NftType.BOX:
                    nftData = await Boxes.findOne({ tokenId: Number(get_order.nftId) }, { session })
                    break
                case NftType.RUNE_PACK:
                    nftData = await RunePacks.findOne({ id: get_order.nftId }, { session })
                    break
                case NftType.PARAART:
                    nftData = await ParaArts.findOne({ tokenId: get_order.nftId }, { session })
                    break
                case NftType.PARAGON:
                    nftData = await Paragons.findOne({ tokenId: get_order.nftId }, { session })
                    break
                default:
                    break
            }
            await Orders.updateOne({ orderId: get_order.orderId }, { $set: { nftData } }, { session })
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
        setTimeout(cron_update_nftData_order, time_out)
    }
}
