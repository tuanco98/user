import { FilterBoxType } from "../../../../models/Common"
import { Boxes } from "../../../../mongodb"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { getBoxType } from "../../../../utils/getBoxType"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    page: number
    pageSize: number
    owner: string
    filter?: FilterBoxType
}
export const pr_user_my_boxes_get = async (root: any, args: any, ctx: any) => {
    try {
        const { owner, page, pageSize, filter } = args as ParamType

        validateMissing({owner, page, pageSize})
        validatePageParam({page, pageSize})
        
        await verify_auth_or_server_key({address: owner, ctx})

        let findOptions = { ownerAddress: owner, unbox: false }

        if (filter) {
            findOptions["typeBox"] = getBoxType(filter)
        }
        const boxes = await Boxes.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort({lastUpdatedAt: -1})
            .toArray()

        const total = await Boxes.countDocuments(findOptions)
        return {
            total,
            boxes,
        }
    } catch (e) {
        throw e
    }
}