import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common"
import { paragonFactoryContract } from "../../../web3"
import { craftParagon } from './craftParagon'
import { uncraftParagon } from './uncraftParagon'

export const getParagonFactoryEvents = async (options: PastEventOptions) => {
    try {
        const allEvents = await paragonFactoryContract.getPastEvents(EventName.ALL_EVENTS, options)
        if (allEvents.length > 0) {
            for (const event of allEvents) {
                switch (event.event) {
                    case EventName.CRAFT_PARAGON:
                        await craftParagon(event)
                        break
                    case EventName.UNCRAFT_PARAGON:
                        await uncraftParagon(event)
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
