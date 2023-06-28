import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common"
import { paraartContract } from "../../../web3"
import { copyrightReserved } from "./copyrightReserved"
import { transfer } from './transfer'

export const getParaArtEvents = async (options: PastEventOptions) => {
    try {
        const events = await paraartContract.getPastEvents(EventName.ALL_EVENTS, options)
        if (events.length > 0) {
            for (const event of events) {
                switch (event.event) {
                    case EventName.COPYRIGHT_RESERVED:
                        await copyrightReserved(event)
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
