import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common"
import { copyrightRentContract } from "../../../web3"
import { rent } from "./rent"
import { setRoyaltyFee } from "./setRoyaltyFee"

export const getCopyrightRentEvents = async (options: PastEventOptions) => {
    try {
        const allEvents = await copyrightRentContract.getPastEvents(EventName.ALL_EVENTS, options)
        if (allEvents.length > 0) {
            for (const event of allEvents) {
                switch (event.event) {
                    case EventName.SET_ROYALTY_FEE:
                        await setRoyaltyFee(event)
                        break
                    case EventName.RENT:
                        await rent(event)
                        break
                    default:
                        break
                }
            }
        }
    } catch (e) {
        throw e
    }
}
