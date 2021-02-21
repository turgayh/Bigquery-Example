const { BigQuery } = require('@google-cloud/bigquery');
const { redisClient } = require('../helper/redis-db')
const { dateFormating } = require('../helper/common-function')
const bigqueryClient = new BigQuery();


module.exports = { getDailyActiveUserInfo }



const checkDailyDistinctUserInRedis = (date) => new Promise(function (resolve, reject) {
    var current = new Date().getTime();
    var ten_minutes_from_now = current - 600000;
    redisClient.zscore('redis_daily_distinct_user', date, function (err, distinct_users) {
        if (!err)
            resolve(distinct_users)
        else
            resolve(0)
        reject(0);
    });

})



async function getDailyActiveUserInfo(data) {
    let distinct_user = 0;
    let flag = 0;

    ntDate = data.date
    let year = data.date.getFullYear()
    let month = data.date.getMonth() + 1;
    let day = data.date.getDate();

    let parseDate = dateFormating(data.date);
    await checkDailyDistinctUserInRedis(parseDate)
        .then((res) => {
            if (res != 0 && res != null)
                distinct_user = parseInt(res);
            else
                flag = 1; //Execute query 
        })

    if (flag) {
        const query = `SELECT
            DATE(event_time) AS day,
                APPROX_COUNT_DISTINCT(user_id) AS distinct_users
            FROM
            \`supple-folder-297118.codeway_bigquery.event\`
            where DATE(event_time) = '${year}-${month}-${day}'
            GROUP BY
            1
            `

        const options = {
            query: query,
            location: 'US',
            useQueryCache: true,
        }

        const [job] = await bigqueryClient.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        
        if (rows[0] != null && rows[0]['distinct_users'] != null) {
            await redisClient.zadd('redis_daily_distinct_user', rows[0]['distinct_users'], parseDate);
            //Total user info add to redis
            distinct_user = parseInt(rows[0]['distinct_users'])
        }
    }
    return distinct_user
}

//daily average durations
async function getDailyAvgDuration() {

}