import { initGraphQLServer } from "./apollo";
import { MONGO_URI } from "./config";
import { connectMongo } from "./mongodb";
import { connectRedis } from "./redis";
import { initSentry } from "./sentry";
import { services } from "./services";
import { connectWeb3, web3 } from "./web3";

(async () => {
    try {
        await Promise.all([
            initSentry(),
            connectMongo(MONGO_URI),
            connectRedis(),
            connectWeb3(),
        ])
        await initGraphQLServer()
        await services()
        const latest_block = await web3.eth.getBlockNumber()
        console.log('latest block:', latest_block)
    } catch (e) {
        throw e
    }
})();