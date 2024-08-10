// config/index.js
const db = require('./db');
const env = require('./env');

module.exports = {
    connectDB: db,
    ...env,
};
