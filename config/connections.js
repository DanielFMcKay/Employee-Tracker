// not currently using
require('dotenv').config();

const mysql = require('mysql2');

placeholder = process.env.db_password;

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'SilenceKit36^_^',
    database: 'employee_db'
  },
  // console.log(process.env.db_password)
);

module.exports = db;
