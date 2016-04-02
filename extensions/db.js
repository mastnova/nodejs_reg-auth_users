const config = require('../config/index');
const db = require('mongoose');

db.connect(config.get('db-host'));

module.exports = db;
