const redis = require('redis')
const dotenv = require('dotenv')
dotenv.config()

const redisClient = redis.createClient(process.env.redis_connection)
console.log(process.env.redis_connection);
module.exports = { redisClient }
