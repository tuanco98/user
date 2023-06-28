import { Accounts } from "../../../../mongodb"
import { validateMissing } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

export const pr_user_refill_energy_get = async (root: any, args: any) => {
    try {
        const { address, server_key } = args as { address: string, server_key: string }
        validateMissing({ address })

        await verify_auth_or_server_key({ address, server_key })
        
        const result = await Accounts.findOne({ address })
        return result ? result : { address, refill_energy: 0 }
    } catch (e) {
        throw e
    }
}
