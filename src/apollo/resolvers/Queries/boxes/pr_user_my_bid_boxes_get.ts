import { SortPriceType, SortDateType, StatusMyList, FilterBoxType, NftType } from "../../../../models/Common"
import { Bids } from "../../../../mongodb"
import { convertPriceDecimaltoString } from "../../../../utils"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { getBoxType } from "../../../../utils/getBoxType"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    page: number
    pageSize: number
    owner: string
    priceSort?: SortPriceType
    dateSort?: SortDateType
    status?: StatusMyList
    filter?: FilterBoxType
}
export const pr_user_my_bid_boxes_get = async (root: any, args: any, ctx: any) => {
    try {
        const { page, pageSize, owner, priceSort, dateSort, status, filter } = args as ParamType

        validateMissing({page, pageSize, owner})
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({address: owner, ctx})
        
        let sort = {}
        
        let findOptions = { bidder: owner, nftType: NftType.BOX, nftData: { $ne: null } }
        if (status) {
            findOptions["status"] = status
        }
        if (filter) {
            findOptions["nftData.typeBox"] = getBoxType(filter)
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
        const getMyBids = await Bids.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()
        const results = convertPriceDecimaltoString(getMyBids)
        const countItem = await Bids.countDocuments(findOptions)
        return {
            total: countItem,
            myBids: results,
        }
    } catch (e) {
        throw e
    }
}
