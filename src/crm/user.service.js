
// Import the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
const config = require('../../config/cloud.json')
module.exports = { getTotalUser }

async function getTotalUser() {
    // Create a client
    const bigqueryClient = new BigQuery({ keyFile: config });

    const sqlQuery = `WITH hll_count AS (
        SELECT  
        HLL_COUNT.INIT(user_id) total_user 
        FROM \`supple-folder-297118.codeway_bigquery.event\`
        ) 
        SELECT  hll_count. MERGE (total_user) 
        FROM hll_count `;

    // const options = {
    //     query: sqlQuery,
    //     // Location must match that of the dataset(s) referenced in the query.
    //     location: 'US',
    //     params: { corpus: 'romeoandjuliet', min_word_count: 250 },
    //     useQueryCache: false,
    // };
    const options = {
        query: sqlQuery,
        location: 'US',
        useQueryCache: true,
    }

    try {

        // Run the query as a job
        const [job] = await bigqueryClient.createQueryJob(options);
        console.log(`Job ${job.id} started.`);

        // Wait for the query to finish
        const [rows] = await job.getQueryResults();

        // Print the results
        console.log('Rows:');
        rows.forEach(row => console.log(row));

        // Print job statistics
        console.log('JOB STATISTICS:')
        console.log(`Status: ${job.metadata.status.state}`);
        console.log(`Creation time: ${job.metadata.statistics.creationTime}`);
        console.log(`Start time: ${job.metadata.statistics.startTime}`);
        console.log(`Statement type: ${job.metadata.statistics.query.statementType}`);

    } catch (error) {
        throw error
    }
}