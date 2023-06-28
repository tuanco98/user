import { Accounts, mongo } from "../../../../mongodb"
import { ErrorHandler, validateMissing } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

interface InputParam {
    signature: string
    signed_message: string
    server_key: string
    address: string
}
export const pr_user_skip_submit_username = async (root: any, args: any, ctx: any) => {
    const session = mongo.startSession()
    try {
        const { address, server_key } = args as InputParam
        const _address = address.trim()
        validateMissing({ _address })

        await verify_auth_or_server_key({address, ctx, server_key})


        await session.withTransaction(async () => {
            const get_account = await Accounts.findOne({ address: _address }, { session })
            const timestamp = +new Date()
            if (!get_account) {
                return Accounts.insertOne(
                    {
                        address: _address,
                        refill_energy: 0,
                        createdAt: timestamp,
                        is_skip_username: true,
                        last_updated: timestamp,
                    },
                    { session }
                )
            }
            if (get_account.is_skip_username) return
            const update_filter = { is_skip_username: true, last_updated: timestamp }
            await Accounts.updateOne({ address: _address }, { $set: update_filter }, { session })
        })
        return true
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        ErrorHandler(e, pr_user_skip_submit_username.name, args)
        throw e
    } finally {
        if (session.inTransaction()) await session.endSession()
    }
}
