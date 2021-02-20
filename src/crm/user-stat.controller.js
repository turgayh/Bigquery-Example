
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery({ keyFile: "/Users/hakanturgay/Desktop/cloud.json" });
const { getTotalUser } = require('./user.service');


router.get('/', userHealthCheck)
router.get('/total-user', totalUser)
module.exports = router;

async function totalUser(req, res, next) {
    let totalUser = await getTotalUser()
    res.json({ total_user: totalUser })
}

function userHealthCheck(req, res, next) {
    res.json("User Statistic Alive...")

}