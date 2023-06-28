import { MONGO_URI } from "../config"
import { App, TypeNotify } from "../models/Notify"
import { connectMongo, mongo, Notifys } from "../mongodb"
import { successConsoleLog } from "../utils/color-log"
import { migrate_data } from "./migrate_data"

const migrate_notify_fusion = async () => {
    const session = mongo.startSession()
    try {
        const notify_fusion = await Notifys.find({
            app: App.FUSION,
            type: TypeNotify.RECEIPT,
            fusion: { $exists: false },
        }).toArray()
        console.log("total document must migrate:", notify_fusion.length)
        await session.withTransaction(async () => {
            for (let [index,notify] of notify_fusion.entries()) {
                const data_migrate = migrate_data.find((el) => {
                    if (notify.address === el.owner && notify.timestamp === el.forging_info.timestamp) return el
                })
                if (!data_migrate) {
                    successConsoleLog(`- ${index+1}/${notify_fusion.length}: data not found!`)
                    continue;
                }
                await Notifys.updateOne(
                    { _id: notify._id },
                    {
                        $set: {
                            fusion: {
                                runeId: data_migrate.runeId,
                                key: data_migrate.key,
                                amount: data_migrate.result,
                            },
                        },
                    },
                    { session }
                )
                successConsoleLog(`- ${index+1}/${notify_fusion.length}: update done!`)
            }
        })
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
const start = async () => {
    try {
        await connectMongo(MONGO_URI)
        await migrate_notify_fusion()
        successConsoleLog('MIGRATE DONE!')
    } catch (e) {
        throw e
    }
}
start()
