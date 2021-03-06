const { PubSub } = require('@google-cloud/pubsub');
const dotenv = require('dotenv')
dotenv.config()
const pubSubClient = new PubSub({ keyFile: process.env.gcloud_keyfile_path });

async function sendMessage(data) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);

    try {
        const messageId = await pubSubClient.topic("codeway-topic").publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
        return messageId;
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
        return error.message;
    }
}


module.exports = { sendMessage }
