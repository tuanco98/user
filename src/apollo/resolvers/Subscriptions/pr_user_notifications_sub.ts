import { withFilter } from "graphql-subscriptions"
import { pubsub } from "."
import { SubTopic } from "../../../models/Common"
import { ErrMsg, ERROR_MESSAGE, validateMissing } from "../../../utils/error_handler"
import { verifySignature } from "../../../utils/verify_signature"

export const pr_user_notifications_sub = {
    subscribe: withFilter(
        () => pubsub.asyncIterator(SubTopic.NOTIFY_MARKET),
        (payload: any, variables: any) => {
            const { signed_message, signature, address } = variables

            validateMissing({ signed_message, signature, address })
            const verify = verifySignature(signed_message, signature, address)
            if (!verify) throw ErrMsg(ERROR_MESSAGE.SIGNED_MESSAGE_INVALID)

            return variables.address === payload.address
        }
    ),
    resolve: (payload: any) => {
        return payload
    },
}
