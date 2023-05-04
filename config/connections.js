const mysql = require('mysql2');

require('dotenv').config()

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',

    // MySQL password
    password: process.env.db_password,
    database: 'employee_db'
  },
);

module.exports = db;