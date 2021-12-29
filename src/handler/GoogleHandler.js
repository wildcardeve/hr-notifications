require('dotenv').config();
const axios = require('axios');

async function getRecentRowValue() {
  try {
    const request = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/${process.env.GOOGLE_SHEET_RANGE}?key=${process.env.GOOGLE_SHEET_KEY}`);
    const rows = request.data?.values;
    return rows[rows.length - 1].toString();
  } catch (err) {
    console.log('Failed getting google sheet information.');
    throw new Error(err);
  }
}

module.exports = getRecentRowValue;
