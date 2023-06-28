import { LogBoxStatus } from "../../../../models/Common"
import { LogBoxDetails, mongo } from "../../../../mongodb"
import { validateMissing } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

type ResultType = Record<"totalBuy" | "totalOpened", number>

export const pr_user_box_history_statistic_get = async (root: any, args: any, ctx: any): Promise<ResultType> => {
    const session = mongo.startSession()
    try {
        const { owner } = args as { owner: string}

        validateMissing({owner})

        await verify_auth_or_server_key({address: owner, ctx})

        let [totalBuy, totalOpened] = [0, 0]

        await session.withTransaction(async () => {
            totalBuy = await LogBoxDetails.countDocuments({ ownerAddress: owner, status: LogBoxStatus.BUY})
            totalOpened = await LogBoxDetails.countDocuments({ ownerAddress: owner, status: LogBoxStatus.OPENED})
        })
        return {
            totalBuy,
            totalOpened
        }
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}