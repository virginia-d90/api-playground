var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

module.exports = {
  baseURL: process.env.BB_API_URL,
  headers: {
    accept: 'application/json'
  },
};

