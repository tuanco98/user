import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common"
import { boxContract } from "../../../web3"
import { buyBox } from "./buyBox"
import { transfer } from "./transfer"
import { unbox } from "./unbox"

export const getBoxEvents = async (options: PastEventOptions) => {
    try {
        const allEvents = await boxContract.getPastEvents(EventName.ALL_EVENTS, options)
        if (allEvents.length > 0) {
            for (const event of allEvents) {
                switch (event.event) {
                    case EventName.BUY_BOX:
                        await buyBox(event)
                        break
                    case EventName.TRANSFER:
                        await transfer(event)
                        break
                    case EventName.UNBOX:
                        await unbox(event)
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
