import { Sort } from "mongodb"

import { SortDateType, SortPriceType } from "../../../../models/Common"
import { Rents } from "../../../../mongodb"
import { convertPriceDecimaltoString } from "../../../../utils"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

interface ParamType {
    page: number
    pageSize: number
    owner: string
    dateSort?: SortDateType
    priceSort?: SortPriceType
}
export const pr_user_my_bid_para_art_rents_get = async (root: any, args: any, ctx: any) => {
    try {
        const { pageSize, page, owner, dateSort, priceSort } = args as ParamType

        validateMissing({ page, pageSize })
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({address: owner, ctx})

        let findOptions = { renter: owner }
        let sort: Sort = {}

        if (dateSort) {
            sort["createdAt"] = dateSort === SortDateType.NEWEST ? -1 : 1
        }
        if (priceSort) {
            sort["price"] = priceSort === SortPriceType.HIGHEST ? 1 : -1
        }
        if (!dateSort && !priceSort) {
            sort = { createdAt: -1 }
        }
        const getRents = await Rents.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()

        const results = convertPriceDecimaltoString(getRents)
        const countItem = await Rents.countDocuments(findOptions)

        return {
            total: countItem,
            rents: results,
        }
    } catch (e) {
        throw e
    }
}
