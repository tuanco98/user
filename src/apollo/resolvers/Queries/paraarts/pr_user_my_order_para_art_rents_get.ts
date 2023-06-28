import { Sort } from "mongodb"
import { LeaseStatus, SortDateType, SortPriceType } from "../../../../models/Common"
import { Leases } from "../../../../mongodb"
import { convertDecimaltoStringLease } from "../../../../utils"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    page: number
    pageSize: number
    owner: string
    dateSort?: SortDateType
    priceSort?: SortPriceType
    status: LeaseStatus
}
export const pr_user_my_order_para_art_rents_get = async (root: any, args: any, ctx: any) => {
    try {
        const { page, pageSize, owner, dateSort, priceSort, status} = args as ParamType

        validateMissing({ page, pageSize, owner })
        validatePageParam({ page, pageSize })
        
        await verify_auth_or_server_key({address: owner, ctx})

        let findOptions = { owner }
        let sort: Sort = {}
        if (status) {
            findOptions['status'] = status
        }
        if (dateSort) {
            sort["createdAt"] = dateSort === SortDateType.NEWEST ? -1 : 1
        }
        if (priceSort) {
            sort["price"] = priceSort === SortPriceType.HIGHEST ? 1 : -1
        }
        if (!dateSort && !priceSort) {
            sort = { createdAt: -1 }
        }
        const leases = await Leases.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()

        const result = convertDecimaltoStringLease(leases)
        const total = await Leases.countDocuments(findOptions)
        
        return {
            total,
            leases: result,
        }
    } catch (e) {
        throw e
    }
}