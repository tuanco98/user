import cliProgress from "cli-progress"
const colors = require("ansi-colors")
import { MONGO_URI, RETROACTIVE_DEADLINE_CLAIM, RETROACTIVE_START_CLAIM } from "../config"
import { CampaignName, RewardType } from "../models/Campaign"
import { SystemLogType } from "../models/SystemLog"
import { Campaigns, connectMongo, SystemLogs } from "../mongodb"
import { errorConsoleLog, successConsoleLog } from "../utils/color-log"
import { readCSV } from "../utils/read_file_csv"

const isReadyRun = async (key: string) => {
    const isExists = await SystemLogs.findOne({ key, type: SystemLogType.CAMPAIGN })
    if (isExists) {
        errorConsoleLog(`Progress with key (${key}) runned at ${new Date(isExists.created_at)}`)
        return false
    }
    return true
}
export const campaign_retroactive_add_whitelist = async () => {
    try {
        const key = `RETROACTIVE-CAMPAIGN`
        const isReady = await isReadyRun(key)
        if (!isReady) return
        const dataFromCsv = await readCSV("src/scripts/files/whitelist_campain_retroactive.csv")
        const whiteLists = dataFromCsv.map((data) => {
            return {
                address: data.Wallet.trim(),
                quantity_reward: Math.floor(Number(data.Matches) / 4),
            }
        })
        successConsoleLog(`total whitelist: ${whiteLists.length}`)
        const progress = new cliProgress.Bar({
            format: "Processing |" + colors.green("{bar}") + "| {percentage}% || {value}/{total} Chunks",
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        })
        progress.start(whiteLists.length, 0, {
            speed: "N/A",
        })
        let total_process = 0
        let total_valid = 0
        for (let user of whiteLists) {
            total_process += 1
            const { address, quantity_reward } = user
            const timestamp = +new Date()
            const start_timestamp_claim = RETROACTIVE_START_CLAIM
            const expires_at = RETROACTIVE_DEADLINE_CLAIM
            const isExist = await Campaigns.findOne({ address, campaign_name: CampaignName.RETROACTIVE })
            if (!isExist) {
                await Campaigns.insertOne({
                    address: address,
                    campaign_name: CampaignName.RETROACTIVE,
                    quantity_reward,
                    reward_type: RewardType.REFILL_ENERGY,
                    start_timestamp_claim,
                    expires_at,
                    created_at: timestamp,
                })
                total_valid += 1
            }
            progress.update(total_process)
            if (total_process >= progress.getTotal()) {
                progress.stop()
            }
        }
        await SystemLogs.insertOne({
            key,
            type: SystemLogType.CAMPAIGN,
            created_at: +new Date(),
            description: "add whitelist retroactive campaign",
            total_document: total_valid,
        })
        successConsoleLog(`insert ${total_valid} document!`)
    } catch (e) {
        throw e
    }
}
;(async () => {
    try {
        await connectMongo(MONGO_URI)
        await campaign_retroactive_add_whitelist()
        successConsoleLog("DONE!")
    } catch (e) {
        throw e
    }
})()
