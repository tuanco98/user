import { cron_latest_block_get } from "./cron_latest_block_get"
import { cron_update_nftData_bid } from "./cron_update_nftData_bid"
import { cron_update_nftData_order } from "./cron_update_nftData_order"

export const cron_handler = async () => {
    try {
        await cron_latest_block_get()
        cron_update_nftData_bid()
        cron_update_nftData_order()
    } catch (e) {
        throw e
    }
}