import { Sort } from "mongodb"
import { SortDateType } from "../../../../models/Common"
import { Paragons } from "../../../../mongodb"
import { convertAmountDecimaltoString } from "../../../../utils"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    owner: string
    page: number
    pageSize: number
    server_key?: string
    sort?: SortDateType
}
export const pr_user_invetory_paragons_get = async(root: any, args: any, ctx: any) => {
    try {
        const { pageSize, page, owner, sort, server_key } = args as ParamType

        validateMissing({ page, pageSize, owner })
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({address: owner, ctx, server_key})
        
        let _sort: Sort = {}

        if (sort) {
            _sort.lastUpdatedAt = sort === SortDateType.NEWEST ? -1 : 1
        }

        let findOptions = { owner, isUncraft: false }

        const paragons = await Paragons.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(_sort)
            .toArray()

        const results = convertAmountDecimaltoString(paragons)
        const total = await Paragons.countDocuments(findOptions)
        return {
            total,
            paragons: results
        }
        
    } catch (e) {
        throw e
    }
}