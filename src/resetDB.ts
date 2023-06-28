import {connectRedis, ioredis} from "./redis";
import { MONGO_URI,SERVER_CODE_REDIS } from "./config";
import { Bids, Boxes, connectMongo, Current_Block, LogBoxDetails, Orders, ParaArts, Rents, RunePacks } from "./mongodb";

(async() => {
    try {
        await connectMongo(MONGO_URI);
        await connectRedis();

        const keyReward = `the_parallel.${SERVER_CODE_REDIS}.reward_box.*`
        const getAllKeyReward = await ioredis.keys(keyReward)

        const keyUnbox = `the_parallel.${SERVER_CODE_REDIS}.handle_unbox.*`
        const getAllKeyUnbox = await ioredis.keys(keyUnbox)

        getAllKeyReward.forEach(async (key) => {
            await ioredis.del(key)
        })
        getAllKeyUnbox.forEach(async (key) => {
            await ioredis.del(key)
        })
        await Promise.all([
            // Bids.deleteMany({}),
            // Bids.dropIndexes({}),
            // Orders.deleteMany({}),
            // Orders.dropIndexes({}),
            // RunePacks.deleteMany({}),
            // RunePacks.dropIndexes({}),
            // ParaArts.deleteMany({}),
            // ParaArts.dropIndexes({}),
            // Rents.deleteMany({}),
            // Rents.dropIndexes({}),
            Current_Block.deleteMany({}),

            Boxes.deleteMany({}),
            Boxes.dropIndexes({}),
            LogBoxDetails.deleteMany({}),
            LogBoxDetails.dropIndexes({}),
        ])
        console.log('🚀 clear success!')
    } catch (e) {
        throw e
    }
})()