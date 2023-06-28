import { Sort } from "mongodb"
import { SortDateType } from "../../../../models/Common"
import { UpdateEnergyPRGLog } from "../../../../mongodb"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

interface InputParam {
    page: number
    pageSize: number
    paragon_id: string
    dateSort?: SortDateType
}
export const pr_user_update_energy_histories_get = async(root: any, args: any, ctx: any) => {
    try {
        const { page, pageSize, paragon_id, dateSort } = args as InputParam

        validateMissing({page, pageSize, paragon_id})
        validatePageParam({page, pageSize})
        
        const findOptions = { paragon_id }
        const sort: Sort = { update_at: -1 }
        if (dateSort) {
            sort.update_at = dateSort === SortDateType.NEWEST ? -1 : 1
        }
        const get_data = await UpdateEnergyPRGLog.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .toArray()

        const total = await UpdateEnergyPRGLog.countDocuments(findOptions)
        return {
            total,
            histories: get_data
        }
    } catch (e) {
        throw e
    }
}