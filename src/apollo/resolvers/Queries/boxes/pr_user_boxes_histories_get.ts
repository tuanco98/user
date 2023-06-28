import { ErrMsg, ERROR_MESSAGE, validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { getBoxType } from "../../../../utils/getBoxType"
import { LogBoxDetails } from "../../../../mongodb"
import { LogBoxStatus, FilterBoxType } from "../../../../models/Common"
import { LogBoxDetail } from "../../../../models/LogBoxDetail"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = { 
    page: number 
    pageSize: number 
    owner: string
    status?: LogBoxStatus
    filter?: FilterBoxType
}
type ResultType = {
    total: number
    logUserBoxes: LogBoxDetail[]
}
export const pr_user_box_histories_get = async (root: any, args: any, ctx: any): Promise<ResultType> => {
    try {
        const { page, pageSize, owner, status, filter } = args as ParamType
        validateMissing({page, pageSize, owner})
        validatePageParam({page, pageSize})

        await verify_auth_or_server_key({address: owner, ctx})
        
        let findOption = { ownerAddress: owner }

        if (status) {
            findOption["status"] = status
        }
        if (filter) {
            findOption["typeBox"] = getBoxType(filter)
        }
        const logUserBoxes = await LogBoxDetails.find(findOption)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort({createdAt: -1})
            .toArray()

        const total = await LogBoxDetails.countDocuments(findOption)

        return {
            total,
            logUserBoxes,
        }
    } catch (e) {
        throw e
    }
}