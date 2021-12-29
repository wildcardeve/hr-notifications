#!/usr/bin/env node
require('dotenv').config();
const CacheHandler = require('./handler/CacheHandler');
const sendToDiscord = require('./handler/DiscordHandler');
const getRecentRowValue = require('./handler/GoogleHandler');

async function notificationSystem() {
  if (process.env.DISCORD_WEBHOOK_URL === '' || process.env.GOOGLE_SHEET_ID === ''
      || process.env.GOOGLE_SHEET_KEY === '' || process.env.GOOGLE_SHEET_RANGE === '') {
    throw new Error('Application not configured correctly, check env files.');
  }

  try {
    const cache = new CacheHandler();

    const latestApplication = await getRecentRowValue();
    const latestCachedApplication = cache.loadApplicationFromCache();

    if (latestApplication !== latestCachedApplication) {
      console.log('Sending to Discord');
      await sendToDiscord();
      console.log('Updating cached version.');
      cache.saveApplicationToCache(latestApplication);
    } else {
      console.log('No new applications.');
    }
  } catch (err) {
    console.log('Main Application Failure.');
    throw new Error(err);
  }
}

notificationSystem();
