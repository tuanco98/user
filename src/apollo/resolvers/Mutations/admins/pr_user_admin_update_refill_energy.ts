import { v4 as uuidv4 } from "uuid"
import { ADMIN_KEY } from "../../../../config"
import { SystemLogType } from "../../../../models/SystemLog"
import { Accounts, mongo, SystemLogs } from "../../../../mongodb"
import { ErrMsg, ERROR_MESSAGE, validateMissing } from "../../../../utils/error_handler"
import { web3 } from "../../../../web3"

interface InputParam {
    addresses: string[]
    address: string
    quantity_energy: number
    reason: string
}
export const pr_user_admin_update_refill_energy = async (root: any, args: any, ctx: any) => {
    const session = mongo.startSession()
    try {
        const { addresses, quantity_energy, reason } = args as InputParam
        const adminKey = ctx.req.headers["admin-key"]

        validateMissing({ addresses, quantity_energy })
        if (addresses.length < 1) throw ErrMsg(ERROR_MESSAGE.MISSING_PARAM)
        if (!adminKey || adminKey !== ADMIN_KEY) throw ErrMsg(ERROR_MESSAGE.PERMISSION_MISSING)
        const timestamp = +new Date()
        session.startTransaction()
        for (let address of addresses) {
            const isAddress = web3.utils.isAddress(address)
            if (!isAddress) throw ErrMsg(ERROR_MESSAGE.ADDRESS_INVALID)
            await Accounts.findOneAndUpdate(
                { address },
                {
                    $setOnInsert: {
                        address,
                        createdAt: timestamp,

                        is_skip_username: false,
                    },
                    $inc: {
                        refill_energy: quantity_energy / 200,
                    },
                    $set: {
                        last_updated: timestamp,
                    },
                },
                { upsert: true, session }
            )
        }
        const system_log = {
            key: uuidv4(),
            type: SystemLogType.ADMIN,
            created_at: timestamp,
            description: `update RE addresses${JSON.stringify(addresses)}, quantity_energy:${quantity_energy}`,
            collection: "Accounts",
            reason,
            total_document: addresses.length,
        }
        await SystemLogs.insertOne(system_log, { session })
        await session?.commitTransaction()
        return system_log
    } catch (e) {
        if (session?.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        if (session?.inTransaction()) await session.endSession()
    }
}
