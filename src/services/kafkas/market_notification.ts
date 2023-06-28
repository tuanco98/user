import { pubsub } from "../../apollo/resolvers/Subscriptions";
import { SubTopic } from "../../models/Common";

import { mongo, Notifys } from "../../mongodb";

export const market_notification_handle = async (event: any) => {
    const session = mongo.startSession();
    try {
        console.log(event);
        const { app, id_msg, type, address, orderId, hashed, fusion, offchain, triggerAt, timestamp } = event;
        await session.withTransaction(async () => {
            const exist = await Notifys.findOne({ id_msg }, { session });
            if (exist) return;
            const new_data = {
                id_msg,
                app,
                type,
                address,
                isRead: false,
                orderId,
                fusion,
                offchain,
                hashed,
                triggerAt,
                timestamp,
            };
            
            await Notifys.insertOne(new_data, { session });
            await pubsub.publish(SubTopic.NOTIFY_MARKET, new_data)
        });
    } catch (e) {
        throw e;
    }
};
