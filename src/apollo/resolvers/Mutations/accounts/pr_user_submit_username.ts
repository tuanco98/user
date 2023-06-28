import { SERVER_KEY } from "../../../../config"
import { Account } from "../../../../models/Account"
import { Accounts, mongo } from "../../../../mongodb"
import { usernameRegex } from "../../../../utils"
import { ErrMsg, ErrorHandler, ERROR_MESSAGE, validateMissing } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"
import { web3 } from "../../../../web3"

interface InputParam {
    signature: string
    signed_message: string
    server_key: string
    address: string
    username: string
}

export const pr_user_submit_username = async (root: any, args: any, ctx: any) => {
    const session = mongo.startSession()
    try {
        const { address, username, server_key } = args as InputParam
        const _address = address.trim()
        const _username = username.trim().toLowerCase()
        validateMissing({ _address, username })
        await verify_auth_or_server_key({address, ctx, server_key})

        if (!usernameRegex.test(username)) throw ErrMsg(ERROR_MESSAGE.INVALID_USERNAME)
        let result: Account | null = null
        await session.withTransaction(async () => {
            const timestamp = new Date().getTime()
            const [found_username_exist, get_account] = await Promise.all([
                await Accounts.findOne({ username: _username }, { session }),
                await Accounts.findOne({ address: _address }, { session }),
            ])
            if (found_username_exist) throw ErrMsg(ERROR_MESSAGE.USERNAME_IS_EXISTS)
            if (!get_account) {
                result = {
                    address: _address,
                    refill_energy: 0,
                    createdAt: timestamp,
                    is_skip_username: true,
                    last_updated: timestamp,
                    username: _username,
                }
                return Accounts.insertOne(result, { session })
            }
            if (get_account.username) throw ErrMsg(ERROR_MESSAGE.ONLY_BE_NAMED_ONCE)
            const { value } = await Accounts.findOneAndUpdate(
                { address: _address },
                { $set: { username: _username, is_skip_username: true, last_updated: timestamp } },
                { session, returnDocument: "after" }
            )
            result = value
        })
        return result
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        ErrorHandler(e, pr_user_submit_username.name, args)
        throw e
    } finally {
        if (session.inTransaction()) await session.endSession()
    }
}
