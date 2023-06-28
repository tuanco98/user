import { Accounts } from "../../../../mongodb"
import { validateMissing } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

interface InputParam {
    address: string
    server_key?: string
}
export const pr_user_account_get = async (root: any, args: any, ctx: any) => {
    try {
        const { address, server_key } = args as InputParam
        validateMissing({ address })

        await verify_auth_or_server_key({address, ctx, server_key})

        const get_account = await Accounts.findOne({ address })
        return get_account ? get_account : {}
    } catch (e) {
        throw e
    }
}
