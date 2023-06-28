import { NftType, SortDateType, SortPriceType, StatusMyList } from "../../../../models/Common"
import { Bids } from "../../../../mongodb"
import { convertPriceDecimaltoString } from "../../../../utils"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    page: number
    pageSize: number
    owner: string
    priceSort?: SortPriceType
    dateSort?: SortDateType
    status?: StatusMyList
}
export const pr_user_my_bids_paragon_get = async (root: any, args: any, ctx: any) => {
    try {
        const { page, pageSize, owner, dateSort, priceSort, status } = args as ParamType
        let sort = {}
        
        validateMissing({page, pageSize, owner})
        validatePageParam({ page, pageSize})
        
        await verify_auth_or_server_key({address: owner, ctx})
        
        let findOptions = { bidder: owner, nftType: NftType.PARAGON }
        if (status) {
            findOptions["status"] = status
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
        const getMyBids = await Bids
            .find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()
        const results = convertPriceDecimaltoString(getMyBids)
        const countItem = await Bids.countDocuments(findOptions)
        return {
            total: countItem,
            myBids: results
        }
    } catch (e) {
        throw e
    }
}