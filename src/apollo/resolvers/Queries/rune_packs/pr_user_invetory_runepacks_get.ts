import { Sort } from "mongodb"
import { SortDateType } from "../../../../models/Common"
import { RunePacks } from "../../../../mongodb"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ParamType = {
    owner: string
    page: number
    pageSize: number
    sort?: SortDateType
}
export const pr_user_invetory_runepacks_get = async (root: any, args: any, ctx: any) => {
    try {
        const { pageSize, page, owner, sort } = args as ParamType

        validateMissing({ page, pageSize })
        validatePageParam({ page, pageSize })

        await verify_auth_or_server_key({
            address: owner,
            ctx,
        })
        
        let _sort: Sort = {}

        if (sort) {
            _sort.lastUpdatedAt = sort === SortDateType.NEWEST ? -1 : 1
        }

        let findOption = { unpackAt: { $exists: false }, isBidding: false }

        if (owner) {
            findOption["owner"] = owner
        }

        const runePacks = await RunePacks.find(findOption)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(_sort)
            .toArray()

        const total = await RunePacks.countDocuments(findOption)

        return {
            total,
            runePacks,
        }
    } catch (e) {
        throw e
    }
}
