import { SERVER_CODE_REDIS } from "../config"
import { ioredis } from "../redis"

export const setIndexBotReward = async (index: number) => {
    try {
        const key = `the_parallel.${SERVER_CODE_REDIS}.set_index_bot_reward.`

        const value = await getIndexBotReward()

        const newValue = value.index + index

        if (!index || newValue >= 3) {
            const result = await ioredis.set(key, JSON.stringify({index: 0}))
            return result
        }
        const result = await ioredis.set(key, JSON.stringify({index: newValue}))
        return result
    } catch (e) {
        throw e
    }
}
export const getIndexBotReward = async ():Promise<{index: number}> => {
    const key = `the_parallel.${SERVER_CODE_REDIS}.set_index_bot_reward.`
    let result = await ioredis.get(key)
    if (!result) {
        await ioredis.set(key, JSON.stringify({index: 0}))
        return JSON.parse(await ioredis.get(key) || '')
    }
    return JSON.parse(result) as {index: number}
}
