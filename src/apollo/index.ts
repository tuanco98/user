import { ApolloServer } from "apollo-server"
import { VISABLE_PLAYGROUND, PORT } from "../config"
import { resolvers } from "./resolvers"
import { typeDefs } from "./typeDefs/schema"
import { successConsoleLog } from "../utils/color-log"

export const initGraphQLServer = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            subscriptions: {
                path: "/",
                keepAlive: 10000,
            },
            context: req => ({
                ...req
            }),
            debug: true,
            playground: VISABLE_PLAYGROUND,
        })
        const { url } = await server.listen({ port: PORT })
        successConsoleLog(`🚀 Apollo server ready at ${url}`)
    } catch (e) {
        throw e
    }
}
