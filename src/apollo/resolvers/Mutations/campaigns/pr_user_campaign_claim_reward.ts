import { ClientSession, ObjectId } from "mongodb"
import { Campaign } from "../../../../models/Campaign"
import { Accounts, Campaigns, mongo } from "../../../../mongodb"
import { ErrMsg, ERROR_MESSAGE, validateMissing } from "../../../../utils/error_handler"
import { verify_auth_or_server_key } from "../../../../utils/verify_auth"

interface InputParam {
    signed_message: string
    signature: string
    address: string
    id: string
}
const updateRifillEnergy = async (campaign: Campaign, session?: ClientSession): Promise<number> => {
    try {
        const { address, quantity_reward } = campaign
        const isExists = await Accounts.findOne({ address }, { session })
        const timestamp = +new Date()
        if (!isExists) {
            await Accounts.insertOne(
                {
                    address,
                    refill_energy: quantity_reward,
                    createdAt: timestamp,
                    is_skip_username: false,
                    last_updated: timestamp,
                },
                { session }
            )
            return quantity_reward
        } else {
            const { value } = await Accounts.findOneAndUpdate({ address }, { $inc: { refill_energy: quantity_reward } }, { returnDocument: "after", session })
            return value ? quantity_reward : 0
        }
    } catch (e) {
        throw e
    }
}
export const pr_user_campaign_claim_reward = async (root: any, args: any, ctx: any) => {
    const session = mongo.startSession()
    try {
        const { signed_message, signature, address, id } = args as InputParam
        validateMissing({ signed_message, signature, address })

        await verify_auth_or_server_key({address, ctx})
        
        let result: { quantity_reward: number; reward_type: string } | null = null
        await session.withTransaction(async () => {
            const timestamp = +new Date()
            const filter_options = { address, _id: new ObjectId(id) }
            const campaign = await Campaigns.findOne(filter_options, { session })
            if (!campaign) throw ErrMsg(ERROR_MESSAGE.REWARD_ID_NOT_EXISTS)
            if (timestamp < campaign.start_timestamp_claim) throw ErrMsg(ERROR_MESSAGE.CAN_NOT_CLAIM_YET)
            if (timestamp > campaign.expires_at) throw ErrMsg(ERROR_MESSAGE.REWARD_HAS_EXPIRED)
            if (campaign.claim_at != null) throw ErrMsg(ERROR_MESSAGE.REWARD_HAS_CLAIMED)
            await Campaigns.updateOne({ _id: campaign._id }, { $set: { claim_at: timestamp } }, { session })
            const result_update = await updateRifillEnergy(campaign, session)
            result = {
                quantity_reward: result_update,
                reward_type: campaign.reward_type,
            }
        })
        return result
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        if (session.inTransaction()) await session.endSession()
    }
}
