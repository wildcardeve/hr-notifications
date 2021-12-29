require('dotenv').config();
const axios = require('axios');

async function sendToDiscord() {
  const discordHeaders = {
    'Content-Type': 'application/json',
  };

  const postData = {
    content: '<@&737696484866392165> There is a new Application! Visit: https://docs.google.com/forms/d/1SrkZf6vyKlay0HUdsTWb8QHMSIcfK4xsPRDSR8Q70VA/edit#responses',
  };

  try {
    await axios({
      method: 'post',
      url: process.env.DISCORD_WEBHOOK_URL,
      headers: discordHeaders,
      data: postData,
    });
  } catch (err) {
    console.log('Failed sending to Discord');
    throw new Error(err);
  }
}

module.exports = sendToDiscord;
