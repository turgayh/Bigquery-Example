
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { publishMessageToPubTopic } = require('./event.service');
const validateRequest = require('../middleware/validate-request');

router.get('/', eventHealthCheck)
router.post('/save', saveEventValidate, saveEvent);

module.exports = router;

function saveEventValidate(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        session_id: Joi.string().required(),
        app_id: Joi.string().required(),
        type: Joi.string(),
        event_name: Joi.string(),
        event_time: Joi.date(),
        page: Joi.string(),
        country: Joi.string(),
        region: Joi.string(),
        city: Joi.string(),
    })
    validateRequest(req, next, schema);

}

function saveEvent(req, res, next) {
    publishMessageToPubTopic(req.body).then((response) => {
        res.json(response)
    })
        .catch(next)
}

function eventHealthCheck(req, res, next) {
    res.json("Event Alive...")

}