import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis'
import { REDIS_URI } from '../../../config';

const pubsub = new RedisPubSub({
    publisher: new Redis(REDIS_URI),
    subscriber: new Redis(REDIS_URI)
})

const subtopic = {
    NOTIFY_MARKET: 'NOTIFY_MARKET'
}

export {
    pubsub,
    subtopic
}