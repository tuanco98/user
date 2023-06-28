import { RunePacks } from "../../../../mongodb"
import { ErrMsg, ERROR_MESSAGE, validateMissing } from "../../../../utils/error_handler"

export const pr_user_invetory_runepack_detail_get = async(root: any, args: any, ctx: any) => {
    try {
        const { id } = args as { id: string }

        validateMissing({ id })

        if (Number(id) < 0) throw ErrMsg(ERROR_MESSAGE.INVALID_PACK_ID)

        const runePack = await RunePacks.findOne({ id, unpackAt: { $exists: false }})

        return runePack
    } catch (e) {
        throw e
    }
}
