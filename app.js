'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');
const process = require('process'); // Required for mocking environment variables
const { PubSub } = require('@google-cloud/pubsub');


// Instantiate a pubsub client
const authClient = new OAuth2Client();
const pubsub = new PubSub();

const app = express();

const { PUBSUB_VERIFICATION_TOKEN } = process.env;
const TOPIC = process.env.PUBSUB_TOPIC;




// List of all messages received by this instance
const messages = [];
const claims = [];
const tokens = [];


// [START gae_flex_pubsub_index]
app.get('/', (req, res) => {
    res.render('index', { messages, tokens, claims });
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;