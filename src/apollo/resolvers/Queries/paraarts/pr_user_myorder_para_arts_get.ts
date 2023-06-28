import { NftType, SortDateType, SortPriceType, StatusMyList, StatusRentPRA } from "../../../../models/Common"
import { Orders } from "../../../../mongodb"
import { convertDecimaltoStringMyOrder } from "../../../../utils"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    page: number
    pageSize: number
    owner: string
    filter?: StatusRentPRA
    priceSort?: SortPriceType
    dateSort?: SortDateType
    status?: StatusMyList
}
export const pr_user_myorder_para_arts_get = async (root: any, args: any, ctx: any) => {
    try {
        const { page, pageSize, owner, priceSort, dateSort, status, filter } = args as ParamType

        validateMissing({ page, pageSize, owner })
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({address: owner, ctx})

        let findOptions = { owner, nftType: NftType.PARAART }
        if (status) {
            findOptions["status"] = status
        }
        if (filter) {
            if (filter === StatusRentPRA.RENTED) findOptions["nftData.rawData.rentInfo.enable"] = true
            else
                findOptions = {
                    ...findOptions,
                    ...{
                        $or: [
                            { "nftData.rawData.rentInfo.enable": false },
                            { "nftData.rawData.rentInfo.enable": { $exists: false } },
                        ],
                    },
                }
        }
        let sort = {}
        if (dateSort) {
            sort["createdAt"] = dateSort === SortDateType.NEWEST ? -1 : 1
        }
        if (priceSort) {
            sort["lastPrice"] = priceSort === SortPriceType.HIGHEST ? 1 : -1
        }
        if (!dateSort && !priceSort) {
            sort = { createdAt: -1 }
        }
        const getOrders = await Orders.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()
        const results = convertDecimaltoStringMyOrder(getOrders)
        const countItem = await Orders.countDocuments(findOptions)
        return {
            total: countItem,
            myOrders: results,
        }
    } catch (e) {
        throw e
    }
}
