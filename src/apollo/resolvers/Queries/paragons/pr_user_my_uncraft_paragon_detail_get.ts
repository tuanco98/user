import { UncraftHistories } from "../../../../mongodb"
import { validateMissing } from "../../../../utils/error_handler"

export const pr_user_my_uncraft_paragon_detail_get = async(root: any, args: any, ctx: any) => {
    try {
        const { tokenId } = args as { tokenId: string }

        validateMissing({ tokenId })

        const uncraft = await UncraftHistories.findOne({ tokenId })

        return uncraft
    } catch (e) {
        throw e
    }
}