import cliProgress from "cli-progress"
const colors = require("ansi-colors")
import { MONGO_URI, PRL_BUILD_URL } from "../config"
import { connectMongo, mongo, ParaArts } from "../mongodb"
import { errorConsoleLog, successConsoleLog } from "../utils/color-log"
import { httpRequest } from "../utils/httpRequest"
import { GRAPHQL_QUERY } from "../utils/queryString"


const migrate_update_structure_para_art = async () => {
    try {
        const paraArtsMustMigrate = await ParaArts.find({ "rawData.structure": null }).toArray()
        console.log("- Total PRA must migrate:", paraArtsMustMigrate.length)
        const bulk_writes: any[] = []
        const progress = new cliProgress.Bar({
            format: "Processing |" + colors.green("{bar}") + "| {percentage}% || {value}/{total} Chunks",
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        })
        progress.start(paraArtsMustMigrate.length, 0, {
            speed: "N/A",
        })
        let total_process = 0
        for (let paraArt of paraArtsMustMigrate) {
            total_process += 1
            const getParaart = await httpRequest(PRL_BUILD_URL, GRAPHQL_QUERY.PR_PARA_ART_GET, { tokenId: Number(paraArt.tokenId) })
            const {
                data: { structure },
            } = getParaart.data.data.pr_para_art_get
            if (!structure) {
                errorConsoleLog("structure null")
                continue
            }
            bulk_writes.push({
                updateOne: {
                    filter: { _id: paraArt._id },
                    update: {
                        $set: { "rawData.structure": structure },
                    },
                },
            })
            await ParaArts.updateOne({ _id: paraArt._id }, { $set: { "rawData.structure": structure }})
            progress.update(total_process)
            if (total_process >= progress.getTotal()) {
                progress.stop()
            }
        }
    } catch (e) {
        throw e
    }
}
const start = async () => {
    try {
        await connectMongo(MONGO_URI)
        await migrate_update_structure_para_art()
        successConsoleLog("MIGRATE DONE!")
    } catch (e) {
        throw e
    }
}
start()
