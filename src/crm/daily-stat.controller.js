
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const { getTotalUser } = require('./user.service');

router.get('/', dailyHealthCheck)
router.post('/save', saveEventValidate, saveEvent);

module.exports = router;




function dailyHealthCheck(req, res, next) {
    res.json("Daily Alive...")

}