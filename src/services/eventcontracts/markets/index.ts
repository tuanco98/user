import { PastEventOptions } from 'web3-eth-contract'

import { EventName } from "../../../models/Common";
import { marketContract } from "../../../web3";
import { bid } from "./bid";
import { orderCancel } from "./orderCancel";
import { orderConfirmed } from "./orderConfirmed";
import { orderCreate } from "./orderCreate";

export const getMarketplaceEvents = async (options: PastEventOptions)=> {
    try {
        const events = await marketContract.getPastEvents(EventName.ALL_EVENTS, options);
        if (events.length > 0) {
            for (const event of events) {
                switch (event.event) {
                    case EventName.ORDER_CREATE:
                        await orderCreate(event);
                        break;
                    case EventName.ORDER_CANCEL:
                        await orderCancel(event);
                        break;
                    case EventName.ORDER_CONFIRMED:
                        await orderConfirmed(event);
                        break;
                    case EventName.BID:
                        await bid(event);
                        break;
                    default:
                        break;
                }
            }
        }
        return
    } catch (e) {
        throw e
    }
};