const { sendMessage } = require("../helper/pub-sub")
async function publishMessageToPubTopic(data) {
    let response = await sendMessage(JSON.stringify(data))
    return response;
}

module.exports = { publishMessageToPubTopic }