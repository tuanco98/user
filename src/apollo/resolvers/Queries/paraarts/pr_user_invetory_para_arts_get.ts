import { Sort } from "mongodb"
import { SortDateType } from "../../../../models/Common"
import { ParaArt } from "../../../../models/ParaArt"
import { ParaArts } from "../../../../mongodb"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"


type ParamType = {
    pageSize: number
    page: number
    owner: string
    sort?: SortDateType
}
type ResultType = {
    total: number
    paraArts: ParaArt[]
}
export const pr_user_invetory_para_arts_get = async (root: any, args: any, ctx: any): Promise<ResultType> => {
    try {
        const { pageSize, page, owner, sort } = args as ParamType

        validateMissing({ page, pageSize })
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({address: owner, ctx})
        
        let _sort: Sort = {}

        if (sort) {
            _sort.lastUpdatedAt = sort === SortDateType.NEWEST ? -1 : 1
        }

        let findOptions = { ownerAddress: owner }

        const paraArts = await ParaArts.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(_sort)
            .toArray()

        const total = await ParaArts.countDocuments(findOptions)

        return {
            total,
            paraArts,
        }
    } catch (e) {
        throw e
    }
}
