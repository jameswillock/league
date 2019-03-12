const axios = require('axios');

module.exports = axios.create({
  baseURL: 'http://api.football-data.org/v2/',
  headers: { 'X-Auth-Token': '11277d6ad8e94818928311cc5c1141e5' }
});
