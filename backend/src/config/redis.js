import {RedisStore} from "connect-redis";
import {createClient} from "redis";
const redisClient = createClient({
    url:`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
    client:redisClient,
    prefix:"myapp"
})

export default redisStore;