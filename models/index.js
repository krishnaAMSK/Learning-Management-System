const dbConfig = require('../config/mysql.config');
const mysql = require('mysql');

const connection = mysql.createConnection(dbConfig);
const userModel = require('../models/userModel');

module.exports = {
    connection,
    User: userModel,
};