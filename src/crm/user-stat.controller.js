
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery({ keyFile: "/Users/hakanturgay/Desktop/cloud.json" });


router.get('/', dailyHealthCheck)
router.get('/total-user', totalUser)

module.exports = router;

const query = `select 
COUNT(DISTINCT user_id) AS total_user
from  \`supple-folder-297118.codeway_bigquery.event\``;

const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
};

function totalUserValidate(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
    })
    validateRequest(req, next, schema);
}

async function totalUser(params) {
    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row));
}


function dailyHealthCheck(req, res, next) {
    res.json("User Statistic Alive...")

}