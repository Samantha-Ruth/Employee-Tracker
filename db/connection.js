const mysql = require("mysql2");
require ("dotenv").config();

// Connect to database
// const db = mysql.createConnection({
//     host: 'localhost',
//     // Your MySQL username,
//     user: 'root',
//     password: '275gtb4!',
//     database: 'employee_tracker'
//   },
//   console.log('Connected to Employee database!')
//   );

// module.exports = db;

// // Would this work to protect password? 
// // no, something up... node:events505? 
// // opens app.js, gives options, then kicks you out.

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;