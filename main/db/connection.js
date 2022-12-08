// Connect to database
const mysql2 = require("mysql2");
const db = mysql2.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
  );


db.connect();
module.exports = db;