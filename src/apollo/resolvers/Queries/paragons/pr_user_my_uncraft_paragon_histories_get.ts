import { UncraftHistories } from "../../../../mongodb"
import { validateMissing, validatePageParam } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth";

type InputType = { page: number; pageSize: number; owner: string }
export const pr_user_my_uncraft_paragon_histories_get = async (root: any, args: any, ctx: any) => {
    try {
        const { page, pageSize, owner } = args as InputType

        validateMissing({ page, pageSize, owner })
        validatePageParam({ page, pageSize })
        
        await verify_auth_or_server_key({
            address: owner,
            ctx,
        })

        const findOptions = { owner }
        const get_uncraft_histories = await UncraftHistories.find(findOptions)
            .limit(pageSize)
            .skip(pageSize * page)
            .sort({createdAt: -1})
            .toArray()
        const total = await UncraftHistories.countDocuments(findOptions)
        return {
            total,
            uncraftHistories: get_uncraft_histories
        }
    } catch (e) {
        throw e
    }
}
