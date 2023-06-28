import { ParaArts, Rents } from "../../../../mongodb"
import { convertDecimaltoStringParaArt, convertPriceDecimaltoString } from "../../../../utils"
import { validateMissing } from "../../../../utils/error_handler"

export const pr_user_invetory_para_art_detail_get = async (root: any, args: any, ctx: any) => {
    try {
        const { tokenId } = args
        
        validateMissing({ tokenId })
        
        const paraart = await ParaArts.findOne({ tokenId })

        const getRents = await Rents.find({ paraArtId: tokenId }).limit(3).sort({ createdAt: -1 }).toArray()
        const rents = convertPriceDecimaltoString(getRents)
        
        if (!paraart) return null

        const result = convertDecimaltoStringParaArt(paraart, rents)
        
        return result
    } catch (e) {
        throw e
    }
}
