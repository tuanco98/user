import { confirmation_blockNumber } from ".."
import { web3 } from "../../web3"

export let latestBlockNumber: number
export const cron_latest_block_get = async () => {
    try {
        const latest_block = await web3.eth.getBlockNumber() 
        latestBlockNumber = latest_block ? latest_block - confirmation_blockNumber : latestBlockNumber
    } catch (e) {
        throw e
    } finally {
        setTimeout(cron_latest_block_get, 2000)
    }
}
