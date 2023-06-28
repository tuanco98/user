import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common"
import { runePackageContract } from "../../../web3"
import { pack } from "./pack"
import { transfer } from "./transfer"
import { unPack } from "./unPack"

export const getRunePackEvents = async (options: PastEventOptions) => {
    try {
        const allEvents = await runePackageContract.getPastEvents(EventName.ALL_EVENTS, options)
        if (allEvents.length > 0) {
            for (const event of allEvents) {
                switch (event.event) {
                    case EventName.PACK:
                        await pack(event)
                        break
                    case EventName.UNPACK:
                        await unPack(event)
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
