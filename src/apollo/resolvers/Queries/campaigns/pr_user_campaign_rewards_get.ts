import { Sort } from "mongodb"
import { SortDateType } from "../../../../models/Common"
import { Campaigns } from "../../../../mongodb"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

enum Status {
    AVAILABLE = "AVAILABLE",
    EXPIRED = "EXPIRED",
    CLAIMED = "CLAIMED",
}
interface InputParam {
    address: string
    pageSize: number
    page: number
    dateSort?: SortDateType
    status?: Status
}
export const pr_user_campaign_rewards_get = async (root: any, args: any, ctx: any) => {
    try {
        const { address, dateSort, page, pageSize, status } = args as InputParam

        validateMissing({ address })
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({address, ctx})

        
        const findOptions = { address }
        const sort: Sort = { created_at: -1 }
        if (status) {
            const timestamp = +new Date()
            if (status === Status.AVAILABLE) {
                findOptions["claim_at"] = { $exists: false }
                findOptions["expires_at"] = { $gte: timestamp }
            } else if (status === Status.EXPIRED) {
                findOptions["expires_at"] = { $lt: timestamp }
                findOptions["claim_at"] = { $exists: false }
            } else {
                findOptions["claim_at"] = { $exists: true }
            }
        }
        if (dateSort) {
            sort["created_at"] = dateSort === SortDateType.NEWEST ? -1 : 1
        }
        const campaign_rewards = await Campaigns.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()
        const total_document = await Campaigns.countDocuments(findOptions)
        return {
            campaign_rewards,
            total: total_document,
        }
    } catch (e) {
        throw e
    }
}
