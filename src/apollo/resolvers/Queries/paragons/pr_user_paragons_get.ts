import { Sort } from "mongodb"
import { SortDateType } from "../../../../models/Common"
import { Paragons } from "../../../../mongodb"
import { convertAmountDecimaltoString } from "../../../../utils"
import { ErrMsg, ERROR_MESSAGE, validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    page: number
    pageSize: number
    tokenIds: string[]
    server_key?: string
    sort?: SortDateType
}
export const pr_user_paragons_get = async (root: any, args: any, ctx: any) => {
    try {
        const { pageSize, page, tokenIds, server_key, sort } = args as ParamType

        validateMissing({ page, pageSize })
        validatePageParam({ page, pageSize })
        if (tokenIds.length < 1) throw ErrMsg(ERROR_MESSAGE.MISSING_PARAM)

        await verify_auth_or_server_key({ server_key })
        
        let _sort: Sort = {}

        if (sort) {
            _sort.lastUpdatedAt = sort === SortDateType.NEWEST ? -1 : 1
        }

        let findOptions = { tokenId: { $in: tokenIds }, isUncraft: false }

        const paragons = await Paragons.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(_sort)
            .toArray()

        const results = convertAmountDecimaltoString(paragons)
        const total = await Paragons.countDocuments(findOptions)
        return {
            total,
            paragons: results,
        }
    } catch (e) {
        throw e
    }
}
