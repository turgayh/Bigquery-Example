const redis = require("redis");
const redisClient = redis.createClient(process.env.redisConnectionString);
module.exports = { redisClient }