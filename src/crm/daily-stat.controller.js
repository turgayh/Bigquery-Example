
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const { getDailyActiveUserInfo } = require('./daily.service');

router.get('/', dailyHealthCheck)
router.post('/active-user', getDailyActiveUserValidate, getDailyActiveUser);

module.exports = router;




function getDailyActiveUserValidate(req, res, next) {
    const schema = Joi.object({
        date: Joi.date().iso().required()
    })
    validateRequest(req, next, schema);
}

async function getDailyActiveUser(req, res, next) {
    let result = await getDailyActiveUserInfo(req.body)
    res.json({ distinct_user: result })
}

function dailyHealthCheck(req, res, next) {
    res.json("Daily Alive...")

}