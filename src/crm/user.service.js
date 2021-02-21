
// Import the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
module.exports = { getTotalUser }
const { redisClient } = require('../helper/redis-db')

const totalUserInfoCheckInCache = () => new Promise(function (resolve, reject) {
    var current = new Date().getTime();
    var ten_minutes_from_now = current - 600000;
    redisClient.zrangebyscore('redis_total_user', ten_minutes_from_now, current, function (err, res) {
        if (!err)
            resolve(res) // return rank
        else
            resolve(false) //
        reject(false)
    });
})

async function getTotalUser() {
    var current = new Date().getTime();
    let flag = 0
    let totalUser = 0;
    await totalUserInfoCheckInCache().then((res) => {
        if (res.length == 0) {
            flag = 1;
        } else {
            let size = res.length
            totalUser = parseInt(res[size - 1])
        }
    })

    if (flag == 1) {
        // Create a client
        const bigqueryClient = new BigQuery();
        // Hyperloglogs algorithm (estimation method) 
        const sqlQuery = `WITH hll_count AS (
        SELECT  
        HLL_COUNT.INIT(user_id) total_user 
        FROM \`supple-folder-297118.codeway_bigquery.event\`
        ) 
        SELECT  hll_count. MERGE (total_user) 
        FROM hll_count `;


        const options = {
            query: sqlQuery,
            location: 'US',
            useQueryCache: true,
        }

        try {
            const [job] = await bigqueryClient.createQueryJob(options);
            const [rows] = await job.getQueryResults();
            //Total user info add to redis
            redisClient.zadd('redis_total_user', current, rows[0]['f0_'])
            totalUser = rows[0]['f0_'];
        } catch (error) {
            throw error
        }
    }
    return totalUser;

}