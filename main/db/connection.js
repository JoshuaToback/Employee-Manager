// Connect to database
const mysql2 = require("mysql2");
const server = require('../server');
require('dotenv').config()

const db = mysql2.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // Add MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  );


db.connect( function (err) {
  if (err) {
    console.log('Connection Failed.')
    return;
  } console.log(`Connected to the company_db database.`)
});

module.exports = db;