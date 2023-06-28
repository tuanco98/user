import { NftType } from "../../models/Common"
import { Bids, mongo, Orders } from "../../mongodb"

let time_out = 100
export const cron_update_nftData_bid = async () => {
    const session = mongo.startSession()
    try {
        const get_bid = await Bids.findOne({ nftData: null })
        if (!get_bid) {
            time_out = 1000
            return
        }
        time_out = 100
        await session.withTransaction(async () => {
            const order = await Orders.findOne({ orderId: get_bid.orderId }, { session })
            await Bids.updateOne({ orderId: get_bid.orderId }, { $set: { nftData: order?.nftData } }, { session })
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
        setTimeout(cron_update_nftData_bid, time_out)
    }
}
