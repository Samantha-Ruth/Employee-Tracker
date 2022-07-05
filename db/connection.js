const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    password: '275gtb4!',
    database: 'employee_tracker'
  });

module.exports = db;

// // Would this work to protect password? 
// const db = mysql.createConnection({
//   host: 'localhost',
//   // Your MySQL username,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// module.exports = db;