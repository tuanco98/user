import { Paragons } from "../../../../mongodb"
import { validateMissing } from "../../../../utils/error_handler"

export const pr_user_invetory_paragon_detail_get = async (root: any, args: any, ctx: any) => {
    try {
        const { tokenId } = args as { tokenId: string }

        validateMissing({ tokenId })

        const paragon = await Paragons.findOne({ tokenId })
        if (!paragon) return null
        return {
            ...paragon,
            amount1: paragon.amount1.toString(),
            amount2: paragon.amount2.toString(),
        }
    } catch (e) {
        throw e
    }
}
