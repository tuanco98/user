import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common"
import { paragonContract } from "../../../web3"
import { transfer } from './transfer'
import { activeParagon } from './activeParagon'

export const getParagonEvents = async (options: PastEventOptions) => {
    try {
        const allEvents = await paragonContract.getPastEvents(EventName.ALL_EVENTS, options)
        if (allEvents.length > 0) {
            for (const event of allEvents) {
                switch (event.event) {
                    case EventName.ACTIVE_PARAGON:
                        await activeParagon(event)
                        break
                    case EventName.TRANSFER:
                        await transfer(event)
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
